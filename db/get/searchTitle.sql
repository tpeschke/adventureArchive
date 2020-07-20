select id from aaadventuremain
where UPPER(title) like UPPER(( '%' || $1 || '%' ))