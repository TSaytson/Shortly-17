import { connectionDB } from "../database/database.js";

export function selectUserById(id) {
    return connectionDB.query(`SELECT * FROM 
    users WHERE id=$1;`, [id]);
}
export function sumViewsUrls(userId) {
    return connectionDB.query(`SELECT SUM(views) 
    FROM urls
    WHERE "userId"=$1;`, [userId]);
}

export function selectUrlByUserId(userId) {
    return connectionDB.query(`SELECT 
    id, "shortUrl", url, views AS "visitCount" FROM urls 
    WHERE "userId"=$1;`, [userId]);
}