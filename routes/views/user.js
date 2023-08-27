import { Router } from "express";
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
    return res.render('resetPassword.ejs',);
})

export default ViewRouter;