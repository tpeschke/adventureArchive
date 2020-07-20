const { connection } = require('./secret')
    , express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , searchCtrl = require('./searchController')
    , mainCtrl = require('./mainController')
    , path = require("path");
    require('dotenv').config();

const app = new express()
app.use(bodyParser.json())
app.use(cors())

/////////////////////////////////
//TESTING TOPLEVEL MIDDLEWARE////
///COMMENT OUT WHEN AUTH0 READY///
/////////////////////////////////
// app.use((req, res, next) => {
//     if (!req.user) {
//         req.user = {
//             id: 1,
//             email: "mr.peschke@gmail.com",
//             patreon: 3
//         }
//     }
//     next();
// })

app.get('/api/AllAdventures', mainCtrl.previews)
app.get('/api/FeaturedAdventure', mainCtrl.featured)
app.get('/api/SingleAdventure/:id', mainCtrl.singleAdventure)

app.get('/api/search', searchCtrl.search)

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

massive(connection).then(dbI => {
    app.set('db', dbI)
    app.listen(3101, _ => {
        console.log(`Why not here? Why not now? 3101`)
    })
})
