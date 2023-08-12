import mysql from 'mysql2';
import { config } from 'dotenv';
config();

function GetConnection() {
    const conn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return conn;
}

export function InitializeDatabase() {
    const conn = GetConnection();
    conn.connect((err) => {
        if (err) {
            console.log("error on database connection : ", err);
            return;
        }

        //create databases
        conn.query(`CREATE TABLE IF NOT EXISTS user(
                    uid varchar(50) PRIMARY KEY NOT NULL UNIQUE, 
                    username varchar(20) NOT NULL UNIQUE, 
                    passowrd varchar(50) NOT NULL,
                    created_on TIMESTAMP NOT NULL
                    );`,
            (err) => {
                if (err) console.log(err);
            });

        conn.query(`CREATE TABLE IF NOT EXISTS emails(
                    uid varchar(50) NOT NULL UNIQUE,
                    email varchar(60) NOT NULL UNIQUE,
                    task_category varchar(10) NOT NULL,
                    confirmed TINYINT NOT NULL,

                    FOREIGN KEY (uid) REFERENCES user(uid)
        )`,
            (err) => {
                if (err) console.log(err);
            })

        conn.query(`CREATE TABLE IF NOT EXISTS task(
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
        )`,
            (err => {
                if (err) console.log(err);
            }))

        console.log(`Successfully initialized the database '${process.env.DB_NAME}'...`)
        conn.end();
    });
}

export default GetConnection;
