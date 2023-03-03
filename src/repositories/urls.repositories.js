import { connectionDB } from '../database/database.js'

export function insertUrl(userId, shortUrl) {
    return connectionDB.query(`INSERT INTO 
    "shortUrls" ("userId", "shortUrl")
    VALUES ($1, $2);`, [userId, shortUrl])
}