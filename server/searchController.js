module.exports = {
    search: (req, res) => {
        const db = req.app.get('db')
        let idArray = []

        for (item in req.query) {
            switch (item) {
                case "title":
                    idArray.push(db.get.searchTitle(req.query.title))
                    break;
                case "summary":
                    idArray.push(db.get.searchSummary(req.query.summary))
                    break;
                case "minLevel":
                    idArray.push(db.get.searchMinLevel(req.query.minLevel))
                    break;
                case "maxLevel":
                    idArray.push(db.get.searchMaxLevel(req.query.maxLevel))
                    break;
                case "minPage":
                    idArray.push(db.get.searchMinPage(req.query.minPage))
                    break;
                case "maxPage":
                    idArray.push(db.get.searchMaxPage(req.query.maxPage))
                    break;
                case "timePeriod":
                    if (req.query.timePeriod !== "NaN") {
                        idArray.push(db.get.searchTimePeriod(req.query.timePeriod))
                    }
                    break;
                case "battlemaps":
                    idArray.push(db.get.searchBattlemaps(req.query.battlemaps))
                    break;
                case "handouts":
                    idArray.push(db.get.searchHandouts(req.query.handouts))
                    break;
                case "playersGuide":
                    idArray.push(db.get.searchPlayersGuide(req.query.playersGuide))
                    break;
                case "plotTwist":
                    idArray.push(db.get.searchPlotTwist(req.query.plotTwist))
                    break;
                case "pregens":
                    idArray.push(db.get.searchPregens(req.query.pregens))
                    break;
                case "environ":
                    if (req.query.environ !== '') {
                        req.query.environ.split(',').forEach(val => {
                            idArray.push(db.get.searchEnviron(+val))
                        })
                    }
                    break;
                case "subsystem":
                    if (req.query.subsystem !== "NaN") {
                        idArray.push(db.get.searchSubsystem(req.query.subsystem))
                    }
                    break;
                case "typeOf":
                    if (req.query.typeOf !== "NaN") {
                        idArray.push(db.get.searchTypeOf(req.query.typeOf))
                    }
                    break;
                case "location":
                //query push to idArray
            }
        }

        Promise.all(idArray).then(ids => {
            let idCountObj = {}
                , finalIdArray = []
                , adventureArray = []
                , effectArray = []
                , queryLength = ids.length

            if (queryLength > 1) {
                ids.forEach(innerIdArray => {
                    innerIdArray.forEach(val => {
                        if (!isNaN(idCountObj[val.id])) {
                            idCountObj[val.id] = ++idCountObj[val.id]
                            if (idCountObj[val.id] === queryLength) {
                                finalIdArray.push(val.id)
                                idCountObj[val.id] = true
                            }
                        } else if (!idCountObj[val.id]) {
                            idCountObj[val.id] = 1
                        }
                    })
                })
            } else if (ids.length !== 0) {
                ids[0].forEach(val => {
                    finalIdArray.push(val.id)
                })
            }

            // add in logic that if the finalIdArray is empty, 
            // than to check the ids with the next highest count 
            // (queryLength - 1) and so on until you get something back

            finalIdArray.forEach(id => {
                effectArray.push(db.get.adventurePreview(id).then(result => {
                    return db.get.summary(id).then(summary => {
                        let adventureObj = {}
                        if (req.user) {
                            adventureObj = { ...result[0], locked: req.user.patreon < result[0].patreontier }
                        } else {
                            adventureObj = { ...result[0], locked: !(result[0].patreontier === 0) }
                        }
                        adventureArray.push({ ...adventureObj, summary: summary[0].summary })
                    })
                }))
            })

            Promise.all(effectArray).then(_ => {
                res.send(adventureArray)
            })
        })
    }
}