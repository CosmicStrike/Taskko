import token from '../../middlewares/token.js'
import pool, { FindUserByName, FindUserByEmail, InsertUser, DeleteUserById } from '../../database.js';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';
import { RandomString, SendEmail } from '../../utils.js';
import { Router } from 'express';

const AuthRouter = Router();
config();

const regexUsername = /[\w@#_-]{4,}/;
const regexPassword = /[\w@#$=&%`~;,/\-\*]{6,}/
const regexEmail = /\b[A-Za-z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z.]+\b/


AuthRouter.get('/confirm', (req, res) => {
    try {
        console.log(req.query.eid);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: "Failed to process the request" });
    }
});

AuthRouter.put('/login', (req, res) => {

});

AuthRouter.post('/register', async (req, res) => {
    /*Request: 
        uname: String
        passwd: String
        email: String
    */
    try {
        const uname = req.body.uname;
        const passwd = req.body.passwd;
        const email = req.body.email;

        // Verify username pattern
        if (!regexUsername.test(uname)) return res.status(400).json({ success: false, message: 'Username contains restricted characters' });

        // Verify Password pattern
        if (!regexPassword.test(passwd)) return res.status(400).json({ success: false, message: 'Password contains restricted characters' });

        //Verify Email Pattern
        if (!regexEmail.test(email)) return res.status(400).json({ success: false, message: 'Email pattern is invalid' });

        //Does username already exists
        if (await FindUserByName(uname)) return res.status(400).json({ success: false, message: 'Username already exists' });

        //Does email already exists
        if (await FindUserByEmail(email)) return res.status(400).json({ success: false, message: 'Email already exists' });

        //Now we have new email and username, so create the user entry;
        let temp_id = uuidv4();
        // Got unique uid
        while ([await pool.query('SELECT uid from user where uid=?', [temp_id])][0][0].length) temp_id = uuidv4();

        // Create User account
        const eid = RandomString();
        if (!await InsertUser(temp_id, uname, await argon2.hash(passwd), eid, email)) return res.status(400).json({ success: false, message: 'Failed to Create new account' });

        // Send the email verification link
        const url = `${process.env.CONFIRM_EMAIL}?id=${temp_id}&eid=${eid}`;
        if (await SendEmail(uname, email, url, 0)) {
            // Successfully send the email
            return res.status(200).json({ success: true, message: 'Successfully send the Confirmation mail' });
        }
        else {
            // Failed to send the mail
            // Revoke the user
            await DeleteUserById(temp_id);
            return res.status(400).json({ success: false, message: 'Failed to send Confirmation mail, Please try again later' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'Failed to process the request' });
    }
});

AuthRouter.put('/logout', (req, res) => {

});

AuthRouter.put('/pass/forgot', (req, res) => {

});

AuthRouter.put('/pass/reset', (req, res) => {

});



export default AuthRouter;