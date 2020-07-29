update aaadventureauxinfo 
set version = $2, 
    pages = $3, 
    levelmin = $4, 
    levelmax = $5, 
    pregens = $6, 
    handouts = $7, 
    battlemap = $8, 
    playerguide = $9, 
    subsystem = $10, 
    setting = $11
where adventureid = $1