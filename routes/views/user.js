import { Router } from "express";
const ViewRouter = Router();

ViewRouter.get('/', (req, res) => {
    return res.render('main.ejs', { auth: true });
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
    return res.render('resetPassword.ejs',);
})

export default ViewRouter;