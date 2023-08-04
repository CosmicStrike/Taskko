import { Router } from "express";
const MainRouter = Router();

MainRouter.get('/', (req, res) => {
    return res.render('main.ejs', { auth: true });
});

MainRouter.get('/history', (req, res) => {
    return res.render('history.ejs', { auth: false });
});

MainRouter.get('/analysis', (req, res) => {
    return res.render('analysis.ejs', { auth: false });
});

MainRouter.get('/services', (req, res) => {
    return res.render('services.ejs', { auth: false });
});

MainRouter.get('/reset', (req, res) => {
    return res.render('resetPassword.ejs',);
})

export default MainRouter;