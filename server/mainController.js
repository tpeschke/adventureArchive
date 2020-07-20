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
            db.get.summaryPreview(result[0].id).then(summary => {
                let adventureObj = {}
                if (req.user) {
                    adventureObj = {...result[0], locked: req.user.patreon < result[0].patreontier}
                } else {
                    adventureObj = {...result[0], locked: !(result[0].patreontier === 0)}
                }
                adventureObj.summary = summary[0].body;
                res.send([adventureObj])
            })
        })
    },
    singleAdventure: (req, res) => {
        const db = req.app.get('db')

        db.get.adventurePreview(req.params.id).then(result => {
            db.get.summaryFull(result[0].id).then(summaryRaw => {
                let summary = []

                summaryRaw.forEach(val => {
                    summary.push(val.body)
                })

                let adventureObj = {}
                if (req.user) {
                    adventureObj = {...result[0], locked: req.user.patreon < result[0].patreontier}
                } else {
                    adventureObj = {...result[0], locked: !(result[0].patreontier === 0)}
                }
                adventureObj.summary = summary;
                res.send([adventureObj])
            })
        })
    }
}