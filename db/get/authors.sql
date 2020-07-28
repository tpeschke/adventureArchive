select aaauthors.id, name from aaauthorsadventure
join aaauthors on aaauthors.id = aaauthorsadventure.authorid
where adventureid = $1
order by name asc;