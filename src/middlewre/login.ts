import { Response, Request, NextFunction } from "express";
const loginT= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session?.utilizador){      
        resp.redirect('/perfilutilizador')
    }else if(req.session?.investidor){
        resp.redirect('/perfilinvestidor')
    }else if(req.session?.esmpresa){
        resp.redirect('/perfilempresa')
    }else{
        next()
    }
}


export default loginT;