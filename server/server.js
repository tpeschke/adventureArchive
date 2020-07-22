const { connection } = require('./secret')
    , express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , searchCtrl = require('./searchController')
    , mainCtrl = require('./mainController')
    , path = require("path")
    , upload = require('./fileUploadController')
    require('dotenv').config();

const app = new express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(__dirname + `/../dist/`));

/////////////////////////////////
//TESTING TOPLEVEL MIDDLEWARE////
///COMMENT OUT WHEN AUTH0 READY///
/////////////////////////////////
app.use((req, res, next) => {
    if (!req.user) {
        req.user = {
            id: 1,
            patreon: 3
        }
    }
    next();
})

app.get('/api/AllAdventures', mainCtrl.previews)
app.get('/api/FeaturedAdventure', mainCtrl.featured)
app.get('/api/SingleAdventure/:id', mainCtrl.singleAdventure)

app.get('/api/search', searchCtrl.search)

app.get('/api/checkLogin', (req, res) => req.user ? res.send(req.user) : res.send({id: null, patreon: null}))

function ownerAuth (req, res, next) {
    if (!req.user) {
        res.sendStatus(401)
    } else if (req.user.id !== 1 && req.user.id !== 21) {
        res.sendStatus(401)
    } else {
        next()
    }
}

app.post('/api/uploadImage/:id', ownerAuth, upload.array('image', 1), (req, res) => res.send({ image: req.file }));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

massive(connection).then(dbI => {
    app.set('db', dbI)
    app.listen(3101, _ => {
        console.log(`Why not here? Why not now? 3101`)
    })
})
