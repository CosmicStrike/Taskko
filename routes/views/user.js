import { Router } from "express";
import pool, { FindUserByName, FindUserByEmail, InsertUser, DeleteUserById, FindUserById, FindEmailById } from '../../database.js'

const ViewRouter = Router();

ViewRouter.get('/', (req, res) => {
    return res.render('main.ejs', { auth: false });
});

ViewRouter.get('/history', (req, res) => {
    return res.render('history.ejs', { auth: true });
});

ViewRouter.get('/analysis', (req, res) => {
    return res.render('analysis.ejs', { auth: true });
});

ViewRouter.get('/services', (req, res) => {
    return res.render('services.ejs', { auth: true });
});

ViewRouter.get('/reset', (req, res) => {
    return res.render('resetPassword.ejs');
})

ViewRouter.get('/confirm', async (req, res) => {
    try {
        const eid = req.query.eid;
        const uid = req.query.id;

        // Check if uid and eid are vaild are not;
        if (!await FindUserById(uid)) throw "Invalid User";
        if (!await FindEmailById(eid)) throw "Invalid Email";

        // Check whether 
        return res.render('emailConfirm.ejs', { message: 'Error' });
    } catch (err) {
        console.log(err);
        return res.render('error.ejs');
    }
})


export default ViewRouter;