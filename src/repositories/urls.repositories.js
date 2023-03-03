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