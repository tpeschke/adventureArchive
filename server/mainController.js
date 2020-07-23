const upload = require('./fileUploadController')

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
            db.get.summary(+req.params.id).then(summary => {
                let adventureObj = {}
                if (req.user) {
                    adventureObj = {...result[0], locked: req.user.patreon < result[0].patreontier}
                } else {
                    adventureObj = {...result[0], locked: !(result[0].patreontier === 0)}
                }
                adventureObj.summary = summary[0].summary
                res.send([adventureObj])
            })
        })
    },

    //ADD
    addAdventure({ body, app }, res) {
        const db = app.get('db')
        let {title, patreontier, seriescode, seriesnumber, summary, type} = body
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
            db.post.summary(adventureId, summary).then(resultTwo => {
                res.send({id: adventureId})
            })
        })
    }
} 