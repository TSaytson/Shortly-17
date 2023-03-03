import { connectionDB } from '../database/database.js'

export function insertUser({ name, email, password }) {
    return connectionDB.query(`INSERT INTO 
    users (name, email, password)
    VALUES ($1, $2, $3);`,
        [name, email, password]);
}

export function verifyUser(email) { 

    return connectionDB.query(`SELECT * FROM 
    users WHERE email=$1`, [email]);
}

export function insertSession(token, userId) {
    
    return connectionDB.query(`INSERT INTO sessions
    (token, "userId")
    VALUES ($1, $2)`, [token, userId]);
}

export function verifySession(userId) {
    return connectionDB.query(`SELECT * FROM 
    sessions WHERE "userId"=$1;`, [userId]);
}