import { Response, Request, NextFunction } from "express";
const utlizadorAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session?.utilizador){      
        next();
    }else{
        resp.redirect('/loginGeral')
    }
}


export default utlizadorAuth;