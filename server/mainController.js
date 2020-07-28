const upload = require('./fileUploadController')
const { createSocket } = require('dgram')

module.exports = {
    previews: (req, res) => {
        const db = req.app.get('db')
        
        db.get.allAdventurePreviews().then(results => {
            let mappedResults = results.map(val => {
                if (req.user) {
                    return {...val, locked: req.user.patreon < val.patreontier}
                } else {
                    return {...val, locked: !(val.patreontier === 0)}
                }
            })
            res.send(mappedResults)
        })
    },
    featured: (req, res) => {
        const db = req.app.get('db')

        db.get.featuredAdventure().then(result => {
            db.get.summary(result[0].id).then(summary => {
                let adventureObj = {}
                if (req.user) {
                    adventureObj = {...result[0], locked: req.user.patreon < result[0].patreontier}
                } else {
                    adventureObj = {...result[0], locked: !(result[0].patreontier === 0)}
                }
                adventureObj.summary = summary[0].summary.split("</p>")[0] + "</p>";
                res.send([adventureObj])
            })
        })
    },
    singleAdventure: (req, res) => {
        const db = req.app.get('db')

        db.get.adventurePreview(+req.params.id).then(result => {
            let promiseArray = []
            let adventureObj = result[0]
            if (req.user) {
                adventureObj.locked = req.user.patreon < result[0].patreontier
            } else {
                adventureObj.locked = !(result[0].patreontier === 0)
            }

            promiseArray.push(db.get.summary(+req.params.id).then(summary => {
                adventureObj.summary = summary[0].summary
            }))

            promiseArray.push(db.get.adventureAuxInfo(+req.params.id).then(auxInfo => {
                delete auxInfo[0].id
                delete auxInfo[0].adventureid
                adventureObj = {...adventureObj, ...auxInfo[0]}
            }))

            promiseArray.push(db.get.authors(+req.params.id).then(authorList => {
                adventureObj.author = authorList
            }))

            promiseArray.push(db.get.environ(+req.params.id).then(environList => {
                adventureObj.environ = environList
            }))

            Promise.all(promiseArray).then(result => {
                res.send([adventureObj])
            })
        })
    },

    //ADD
    addAdventure({ body, app }, res) {
        const db = app.get('db')
        let {title, patreontier, seriescode, seriesnumber, summary, type, version, pages, levelmin, levelmax, pregens, handouts, battlemap, playerguide, subsystem, setting, author:authors, environ:environs} = body
        , tooltip = "Early Access"

        switch (patreontier) {
            case ("0"):
                tooltip = "Basic"
                break;
            case ("3"):
                tooltip = "Advanced"
                break;
            default:
                break;
        }
        db.post.mainAdventure(title, patreontier, seriescode, seriesnumber, tooltip, type).then(result => {
            let adventureId = result[0].id
            ,   promiseArray = []

            promiseArray.push(db.post.summary(adventureId, summary).then())

            promiseArray.push(db.post.adventureAuxInfo(adventureId, version, pages ? +pages : null, levelmin ? +levelmin : null, levelmax ? +levelmax : null, pregens, handouts, battlemap, playerguide, subsystem, setting ).then())

            authors.forEach(author => {
                if(author.delete) {

                } else if (!author.id) {
                    promiseArray.push(db.post.author(author.name).then(_=>{
                        return promiseArray.push(db.post.authorAdventure(adventureId, author.name).then())
                    }))
                } else {

                }
            })

            environs.forEach(environ => {
                if(environ.delete) {

                } else if (!environ.id) {
                    promiseArray.push(db.post.environ(adventureId, environ.environid).then())
                } else {

                }
            })

            Promise.all(promiseArray).then(_ => res.send({id: adventureId}))
        })
    }
} 