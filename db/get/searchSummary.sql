select DISTINCT(id) from aasummary
where UPPER(body) like UPPER(( '%' || $1 || '%' ))