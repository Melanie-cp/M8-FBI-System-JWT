import { pool } from '../database/connection.database.js'

const findOneByEmail = async (email) => {
    const query = {
        text: `
            SELECT * FROM USERS
            WHERE EMAIL = $1
        `,
        values: [email]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}


export const UserModel = {
    findOneByEmail
}