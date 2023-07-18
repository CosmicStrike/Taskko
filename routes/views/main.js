import { Router } from "express";
const MainRouter = Router();

MainRouter.get('/', (req, res) => {
    return res.render('main.ejs');
});

MainRouter.get('/history', (req, res) => {
    return res.render('history.ejs');
});

MainRouter.get('/analysis', (req, res) => {
    return res.render('analysis.ejs');
});

MainRouter.get('/services', (req, res) => {
    return res.render('services.ejs');
});

MainRouter.get('/reset', (req, res) => {
    return res.render('resetPassword.ejs');
})

export default MainRouter;