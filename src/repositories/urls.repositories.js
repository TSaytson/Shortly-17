import { connectionDB } from '../database/database.js'

export function insertUrl(
    userId, url, shortUrl) {
    return connectionDB.query(`INSERT INTO 
    urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3);`,
        [userId, url, shortUrl])
}

export function selectUrlById(id) {
    return connectionDB.query(`
    SELECT * FROM urls
    WHERE id=$1;`, [id]);
}

export function selectUrlByshortUrl(shortUrl) {
    return connectionDB.query(`SELECT * FROM 
    urls WHERE "shortUrl"=$1;`, [shortUrl]);
}

export function updateUrlViews(id) {
    return connectionDB.query(`UPDATE urls
    SET views = views + 1
    WHERE id=$1;`, [id]);
}
export function deleteUrl(id) {
    return connectionDB.query(`DELETE FROM 
    urls WHERE id=$1;`, [id]);
}