import { connectionDB } from "../database/database.js";

function selectUserById(id) {
    return connectionDB.query(`SELECT * FROM 
    users WHERE id=$1;`, [id]);
}
function sumViewsUrls(userId) {
    return connectionDB.query(`SELECT SUM(views) 
    FROM urls
    WHERE "userId"=$1;`, [userId]);
}

function selectUrlByUserId(userId) {
    return connectionDB.query(`SELECT 
    id, "shortUrl", url, views AS "visitCount" FROM urls 
    WHERE "userId"=$1;`, [userId]);
}

function selectUsersJoinUrlsRanking() {
    return connectionDB.query(`SELECT 
    u.id, u.name, COUNT(u.id) AS "linksCount",
    COALESCE(SUM(urls.views), 0) AS "visitCount"
    FROM users u LEFT JOIN urls
    ON u.id = urls."userId"
    GROUP BY u.id
    ORDER BY "visitCount" DESC LIMIT 10;`);
}


export const usersRepository = {
    selectUserById,
    sumViewsUrls,
    selectUrlByUserId,
    selectUsersJoinUrlsRanking
}