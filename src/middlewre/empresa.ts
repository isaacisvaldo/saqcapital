import { Response, Request, NextFunction } from "express";
const pacienteAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session?.empresa){      
        next();
    }else{
        resp.redirect('/login')
    }
}

export default  pacienteAuth;