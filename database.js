import mysql from 'mysql2/promise';
import { config } from 'dotenv';

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
                    password varchar(100) NOT NULL,
                    created_on DATETIME NOT NULL DEFAULT now(),
                    verified TINYINT NOT NULL DEFAULT 0,
                    refresh varchar(50) UNIQUE
                    );`);

        // email type = 0 for primary and 1 for secondary
        // confirmed = 1 for confirmation and 0 fro not comfirmation
        await conn.query(`CREATE TABLE IF NOT EXISTS emails(
                    eid varchar(100) NOT NULL UNIQUE PRIMARY KEY,
                    uid varchar(50) NOT NULL,
                    email varchar(60) NOT NULL UNIQUE,
                    task_category varchar(10) NOT NULL DEFAULT 'NULL',
                    confirmed TINYINT NOT NULL DEFAULT 0,
                    type TINYINT NOT NULL DEFAULT 0,

                    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE
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
                    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE
        )`)

        console.log(`Successfully initialized the database '${process.env.DB_NAME}'...`);
        conn.release();

        // console.log(await InsertUser('1', 'hubham', 'ko', 'email10'));
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

export async function FindUserByEmail(email) {
    try {
        const [rows] = await pool.execute('SELECT * FROM user WHERE uid=(SELECT uid FROM emails WHERE email=?)', [email]);
        if (rows.length === 0) return false;
        else return rows[0];
    }
    catch (err) {
        console.log("Failed to get user by email");
        return null;
    }
}

export async function FindEmailById(eid) {
    try {
        const [rows] = await pool.execute('SELECT * FROM emails WHERE eid=?', [eid]);
        if (rows.length === 0) return false;
        else return rows[0];
    }
    catch (err) {
        console.log("Failed to get email by id");
        return null;
    }
}

export async function InsertUser(uid, uname, password, eid, email) {
    let conn;
    try {
        console.log(uid, uname, password, eid, email)
        conn = await pool.getConnection();
        await conn.beginTransaction();
        await conn.execute('INSERT INTO user (uid, username, password) Values (?,?,?);', [uid, uname, password]);
        await conn.execute('INSERT INTO emails (eid, uid, email) VALUES (?, ?,?);', [eid, uid, email]);
        conn.commit();
        return true;
    }
    catch (err) {
        console.log("\nFailed to create new user account for user", uname);
        console.log(err);
        conn.rollback();
        return false;
    }
    finally {
        conn.release();
    }
}

export async function ConfirmEmailById(eid) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.execute('UPDATE emails SET confirmed=1 WHERE eid=?', [eid]);
        conn.commit();
        return true;
    }
    catch (err) {
        conn.rollback();
        console.log("\nFailed to UPDATE the existing email having eid as ", eid);
        console.log(err);
        return false;
    }
    finally {
        conn.release();
    }
}


export async function VerifyUserById(uid) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.execute('UPDATE user SET verified=1 WHERE uid=?', [uid]);
        conn.commit();
        return true;
    }
    catch (err) {
        conn.rollback();
        console.log("\nFailed to Verify the user having eid as ", uid);
        console.log(err);
        return false;
    }
    finally {
        conn.release();
    }
}


export async function DeleteUserById(uid) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();
        await conn.execute("DELETE FROM user where uid=?", [uid]);
        conn.commit();
        return true;
    }
    catch (err) {
        console.log('\nFailed to delete the existing user having id', uid);
        console.log(err);
        conn.rollback();
        return false;
    }
    finally {
        conn.release();
    }
}
export default pool;
