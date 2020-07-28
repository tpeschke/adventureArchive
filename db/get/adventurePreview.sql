select aaadventuremain.*, seriestitle from aaadventuremain
left join aaadventureseriescode on aaadventuremain.seriescode = aaadventureseriescode.seriescode
where aaadventuremain.id = $1