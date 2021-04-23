const { databaseCredentials, fakeAuth, secret, domain, client_id, client_secret, callback } = require('./secret')
    , express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , searchCtrl = require('./searchController')
    , mainCtrl = require('./mainController')
    , path = require("path")
    , upload = require('./fileUploadController')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
require('dotenv').config();

const app = new express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(__dirname + `/../dist/`));

//==============================================
app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain,
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: callback,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { displayName, user_id } = profile;
    const db = app.get('db');

    db.get.find_User([user_id]).then(function (users) {
        if (!users[0]) {
            db.post.create_User([
                displayName,
                user_id
            ]).then(users => {
                return done(null, users[0].id)
            })
        } else {
            return done(null, users[0].id)
        }
    })
}))

app.use(fakeAuth)

passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').get.find_Session_User([id]).then((user) => {
        return done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `/`
}));

app.get('/auth/logout', function (req, res) {
    req.logOut();
    res.redirect(`/`)
})

// =====================================

app.get('/api/AllAdventures', mainCtrl.previews)
app.get('/api/FeaturedAdventure', mainCtrl.featured)
app.get('/api/SingleAdventure/:id', mainCtrl.singleAdventure)

app.get('/api/search', searchCtrl.search)

app.get('/api/recordDownload/:id', mainCtrl.recordDownload)

app.get('/api/checkLogin', (req, res) => req.user ? res.send(req.user) : res.send({ id: null, patreon: null }))

function ownerAuth(req, res, next) {
    if (!req.user) {
        res.sendStatus(401)
    } else if (req.user.id !== 1 && req.user.id !== 21) {
        res.sendStatus(401)
    } else {
        next()
    }
}

app.post('/api/uploadImage/:id', ownerAuth, upload.array('image', 1), (req, res) => res.send({ image: req.file }));
app.post('/api/uploadPDF/:title', ownerAuth, upload.array('pdf', 1), (req, res) => res.send({ image: req.file }));

app.post('/api/adventure', ownerAuth, mainCtrl.addAdventure)

app.patch('/api/update/adventure', ownerAuth, mainCtrl.updateAdventure)

app.delete('/api/delete/adventure/:id', ownerAuth, mainCtrl.deleteAdventure)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(3101, _ => {
        console.log(`Why not here? Why not now? 3101`)
    })
})
