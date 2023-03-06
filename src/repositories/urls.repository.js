import { connectionDB } from '../database/database.js'

function insertUrl(
    userId, url, shortUrl) {
    return connectionDB.query(`INSERT INTO 
    urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3);`,
        [userId, url, shortUrl])
}

function findUrl(url) {
    return connectionDB.query(`SELECT * FROM
    urls WHERE url=$1;`, [url]);
}

function selectFieldsUrlById(id) {
    return connectionDB.query(`
    SELECT id, "shortUrl", url FROM urls
    WHERE id=$1;`, [id]);
}

function selectUrlById(id) {
    return connectionDB.query(`SELECT * FROM 
    urls WHERE id=$1;`, [id]);
}

function selectByshortUrl(shortUrl) {
    return connectionDB.query(`SELECT * FROM 
    urls WHERE "shortUrl"=$1;`, [shortUrl]);
}

function updateUrlViews(id) {
    return connectionDB.query(`UPDATE urls
    SET views = views + 1
    WHERE id=$1;`, [id]);
}
function deleteUrl(id) {
    return connectionDB.query(`DELETE FROM 
    urls WHERE id=$1;`, [id]);
}


export const urlRepository = {
    insertUrl,
    findUrl,
    selectFieldsUrlById,
    selectUrlById,
    selectByshortUrl,
    updateUrlViews,
    deleteUrl
}