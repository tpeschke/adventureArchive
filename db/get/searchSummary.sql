select adventureid as id from aasummary
where UPPER(body) like UPPER(( '%' || $1 || '%' ))