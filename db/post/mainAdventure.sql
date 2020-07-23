insert into aaAdventureMain (
    title, patreonTier, seriescode, seriesnumber, tooltip, type
) values (
    $1, $2, $3, $4, $5, $6
)
RETURNING *;