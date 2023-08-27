import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import pool from '../database.js';

const { sign, verify } = jwt
config()

export async function GenerateAccessToken(uid) {
    try {

        // Verify whether given uid is valid
        const [rows] = await pool.execute('SELECT uid from user where uid=?', [uid]);
        if (rows.length === 0) return null;// Given userID does not exist

        return sign(
            {
                uid: uid
            },
            process.env.TOKEN_SECRET,
            {
                algorithm: 'HS256',
                jwtid: process.env.JWT_ID,
                expiresIn: process.env.ACCESS_COOKIE_EXPIRE
            }
        );
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
export async function GenerateRefreshToken(uid) {
    try {
        // Verify whether given uid is valid
        const [rows] = await pool.execute('SELECT uid from user where uid=?', [uid]);
        if (rows.length === 0) return null;// Given userID does not exist

        // We will generate new refresh id which is not present in database
        let temp_id = uuidv4();
        while ([await pool.execute("SELECT refresh from user where refresh=?;", [temp_id])][0][0].length) temp_id = uuidv4();

        return sign(
            {
                uid: uid,
                rid: temp_id
            },
            process.env.TOKEN_SECRET,
            {
                algorithm: 'HS256',
                jwtid: process.env.JWT_ID,
                expiresIn: process.env.REFRESH_COOKIE_EXPIRE
            }
        );

    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export default async function token(req, res, next) {

}