insert into aaAdventureMain (
    title, patreonTier, seriescode, seriesnumber, tooltip
) values (
    $1, $2, $3, $4, $5
)
RETURNING *;