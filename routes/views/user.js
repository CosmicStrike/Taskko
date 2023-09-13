import { Router } from "express";
import pool, { FindUserByName, FindUserByEmail, InsertUser, DeleteUserById, FindUserById, FindEmailById, ConfirmEmailById, VerifyUserById } from '../../database.js'

const ViewRouter = Router();

ViewRouter.get('/', (req, res) => {
    return res.render('main.ejs', { auth: false });
});

ViewRouter.get('/history', (req, res) => {
    return res.render('history.ejs', { auth: false });
});

ViewRouter.get('/analysis', (req, res) => {
    return res.render('analysis.ejs', { auth: false });
});

ViewRouter.get('/services', (req, res) => {
    return res.render('services.ejs', { auth: false });
});

ViewRouter.get('/reset', (req, res) => {
    return res.render('resetPassword.ejs');
})

ViewRouter.get('/confirm', async (req, res) => {
    try {
        const eid = req.query.eid;
        const uid = req.query.id;

        // Check if uid and eid are vaild are not;
        const user = await FindUserById(uid);
        if (!user) throw "Invalid User";

        const email = await FindEmailById(eid);
        if (!email) throw "Invalid Email";

        if (user.uid !== email.uid) throw "MisMatch";

        // Check whether user is verified previously or not
        if (user.verified) {
            // This is his/her secondary email
            if (email.confirmed) return res.render('emailConfirm.ejs', { message: 'Your Email is already Verified' });
            else {
                // Confirm the email
                if (!await ConfirmEmailById(email.eid)) return res.render('emailConfirm.ejs', { message: 'Failed to verify the email, please try again later...' });
            }
        }
        else {// This is his primary email

            // Confirm the email
            if (!await ConfirmEmailById(email.eid)) return res.render('emailConfirm.ejs', { message: 'Failed to verify the email, please try again later...' });
            // Verify the user account
            if (!await VerifyUserById(user.uid)) return res.render('emailConfirmed.ejs', { message: 'Failed to verify the email, please try again later...' });
        }
        return res.render('emailConfirm.ejs', { message: 'Successfully Verified the email, Now you can login with your credentials' });
    } catch (err) {
        console.log(err);
        return res.render('error.ejs');
    }
})


export default ViewRouter;