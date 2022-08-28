import {Router, Request, Response} from 'express';
const Route= Router (); 
import knex from './database/conection';

import multerConfig from './config/multer';
import multer from 'multer';
import loginT from './middlewre/login'
const upload = multer(multerConfig);






//Rotas Gerais do Sistema
//Login principal
Route.get('/login',loginT, (req:Request, resp: Response)=>{
    resp.render('website/form/login',{certo:req.flash('certo'),errado:req.flash('errado')})
})

//Cadastrar principal
Route.get('/conta', (req:Request, resp: Response)=>{
    resp.render('website/form/utilizador',{info:req.flash('info'),errado:req.flash('errado')})
})
Route.get('/containvestidor', (req:Request, resp: Response)=>{
    resp.render('website/form/investidor',{info:req.flash('info'),errado:req.flash('errado')})
})
Route.get('/contaempresa', (req:Request, resp: Response)=>{
    resp.render('website/form/empresa',{info:req.flash('info'),errado:req.flash('errado')})
})




// Home page do Sistema
Route.get('/',async (req:Request, resp: Response)=>{
    const projectos = await knex('projectoempresa').select('*')
    const verify = await knex('utilizador').select('*')
    const empresa = await knex('empresa').select('*')
    const investidores = await knex('investidor').select('*')
    const usuarios = (verify.length + empresa.length + investidores.length);
    console.log(empresa)

    resp.render('webSite/index',{usuarios,certo:req.flash('certo'),errado:req.flash('errado'),projectos,empresa,investidores})
})

Route.get('/logout', (req:Request, resp: Response)=>{
    req.session = undefined
    resp.redirect('/')
})
Route.get('/projecto1/:id', async (req:Request, resp: Response)=>{
   const{id}= req.params;
   const pje = await knex('projectoempresa').join('empresa','projectoempresa.idEmpresa','=','empresa.id').where('projectoempresa.idProjecto', id).first()
   console.log(pje)
   resp.render('website/projecto',{pje})
    
})

//LOGIN GERAL DO SISTEMA
Route.post('/login',async (req:Request, resp: Response)=>{ 
    try {
        const{username,senha}=req.body;
        const utilizador =  await knex('utilizador').where('username',username).orWhere('email',username).andWhere('senha',senha).first()
        const investidor =  await knex('investidor').where('username',username).orWhere('email',username).andWhere('senha',senha).first()
        const empresa =  await knex('empresa').where('email',username).andWhere('senha',senha).first()
        if(utilizador != undefined){
        if(req.session){
         req.session.utilizador={id:utilizador.id, nome:utilizador.nome};
         resp.redirect('/perfilutilizador')
         }
         }else if(investidor !=undefined){
            if(req.session){
                req.session.investidor={id:investidor.id, nome:investidor.nome};
              resp.redirect('/perfilinvestidor')
                }
            
        }else if(empresa !=undefined){
            if(req.session){
                req.session.empresa={id:empresa.id, nome:empresa.nome};
              resp.redirect('/perfilempresa')
                }
            
        }
    } catch (error) {
        console.log(error)
    }
})

export default Route;