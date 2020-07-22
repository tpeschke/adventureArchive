select body from aasummary
where UPPER(body) like UPPER(( '%' || $1 || '%' ))