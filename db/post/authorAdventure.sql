insert into aaauthorsadventure (adventureid, authorid) values
($1, (select id as authorid from aaauthors where name like $2 limit 1));