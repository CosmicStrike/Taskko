import token from '../../middlewares/token.js'
import pool, { FindUserByName, FindUserByEmail } from '../../database.js';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { RandomString } from '../../utils.js';
import { Router } from 'express';

const AuthRouter = Router();
config();

const regexUsername = /[\w@#_-]{4,}/;
const regexPassword = /[\w@#$=&%`~;,/\-\*]{6,}/
const regexEmail = /\b[A-Za-z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z.]+\b/

AuthRouter.get('/login', (req, res) => {

});

AuthRouter.put('/login', (req, res) => {

});

AuthRouter.post('/register', async (req, res) => {
    /*Request: 
        uname: String
        passwd: String
        email: String
    */
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

    //TODO: Now we have new email and username, so create the user entry
});

AuthRouter.put('/logout', (req, res) => {

});

AuthRouter.put('/pass/forgot', (req, res) => {

});

AuthRouter.put('/pass/reset', (req, res) => {

});



export default AuthRouter;