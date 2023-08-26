import mysql from 'mysql2/promise';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20
});

export async function InitializeDatabase() {
    try {
        const conn = await pool.getConnection();
        //create databases
        await conn.query(`CREATE TABLE IF NOT EXISTS user(
                    uid varchar(50) PRIMARY KEY NOT NULL UNIQUE, 
                    username varchar(20) NOT NULL UNIQUE, 
                    password varchar(50) NOT NULL,
                    created_on DATETIME NOT NULL DEFAULT now(),
                    verified TINYINT NOT NULL DEFAULT 0,
                    refresh varchar(50) UNIQUE
                    );`);

        // email type = 0 for primary and 1 for secondary
        // confirmed = 1 for confirmation and 0 fro not comfirmation
        await conn.query(`CREATE TABLE IF NOT EXISTS emails(
                    uid varchar(50) NOT NULL UNIQUE,
                    email varchar(60) NOT NULL UNIQUE,
                    task_category varchar(10) NOT NULL,
                    confirmed TINYINT NOT NULL DEFAULT 0,
                    type TINYINT NOT NULL DEFAULT 0,

                    FOREIGN KEY (uid) REFERENCES user(uid)
        )`)

        await conn.query(`CREATE TABLE IF NOT EXISTS task(
                    tid BIGINT NOT NULL AUTO_INCREMENT,
                    uid varchar(50) NOT NULL UNIQUE,
                    title varchar(100) NOT NULL,
                    description varchar(250) DEFAULT 'No Description',
                    category varchar(10) NOT NULL,
                    created_on TIMESTAMP NOT NULL,
                    deadline TIMESTAMP NOT NULL,
                    reminder TINYINT NOT NULL DEFAULT 0,

                    PRIMARY KEY (tid),
                    FOREIGN KEY (uid) REFERENCES user(uid)
        )`)

        console.log(`Successfully initialized the database '${process.env.DB_NAME}'...`);
        conn.release();
    }
    catch (err) {
        console.log("Error in connecting to database");
        console.log(err);
    }
}

export async function FindUserById(uid) {
    try {
        const [rows] = await pool.execute('SELECT * FROM user where uid=?', [uid]);
        if (rows.length === 0) return false;// user does not exists
        else return rows[0];
    } catch (err) {
        console.log("Failed to get user by id");
        return null;
    }
}

export async function FindUserByName(uname) {
    try {
        const [rows] = await pool.execute('SELECT * FROM user where username=?', [uname]);
        if (rows.length === 0) return false;// user does not exists
        else return rows[0];
    }
    catch (err) {
        console.log("Failed to get user by name");
        return null;
    }
}
export default pool;
