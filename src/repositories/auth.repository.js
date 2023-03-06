import { connectionDB } from '../database/database.js'

function insertUser({ name, email, password }) {
    return connectionDB.query(`INSERT INTO 
    users (name, email, password)
    VALUES ($1, $2, $3);`,
        [name, email, password]);
}

async function findUser(email) { 

    return connectionDB.query(`SELECT * FROM 
    users WHERE email=$1`, [email]);
}

function insertSession(token, userId) {
    
    return connectionDB.query(`INSERT INTO sessions
    (token, "userId")
    VALUES ($1, $2)`, [token, userId]);
}

function findSession(userId) {
    return connectionDB.query(`SELECT * FROM 
    sessions WHERE "userId"=$1;`, [userId]);
}

export const authRepository = {
    insertUser,
    findUser,
    insertSession,
    findSession
}