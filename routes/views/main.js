import { Router } from "express";
const MainRouter = Router();

MainRouter.get('/', (req,res)=>{
    return res.render('main.ejs');
});

export default MainRouter;