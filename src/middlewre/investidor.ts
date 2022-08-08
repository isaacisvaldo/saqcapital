import { Response, Request, NextFunction } from "express";
const medicoAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session?.investidor){
       
            next();
       
    }else{
        resp.redirect('/login')
    }
}


export default medicoAuth;