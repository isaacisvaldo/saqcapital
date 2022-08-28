import knex from '../database/conection';
import multer from 'multer'
import multerConfig from '../config/multer';
import { Response, Request, Router } from  "express";
// import bCryptjs from 'bcryptjs'
const upload = multer(multerConfig);
const Investidor=Router();

import investidor from '../middlewre/investidor'
import { Knex } from 'knex';


Investidor.post('/cadastarInvestidor',async(req:Request, resp: Response)=>{
  try {
    const {nome,email,tell,senha,senha2,provincia,municipio,username,genero,endereco,nif,biografia}= req.body; 
  
    if(nome===""||nif===""||email===""||tell===""||senha==="" ||senha!=senha2 ){
      req.flash('', 'Ocorreu um problema');
      resp.redirect('/listarEspecialidade')
    }else{
      const verify = await knex('utilizador').where('email',email).orWhere('tell',tell)
      const verify1 = await knex('empresa').where('email',email).orWhere('tell',tell)
      const verify2 = await knex('investidor').where('email',email).orWhere('tell',tell)
      if(verify.length!==0||verify1.length!==0||verify2.length!==0){
        req.flash('errado','Ocorreu um problema');
      resp.redirect('/containvestidor')
    }else{
      const image= (req.file) ? req.file.filename: 'user.png';
      const investidor = await knex('investidor').insert({image,nome,nif,username,email,genero,tell,senha,estado:1,provincia,municipio,endereco,biografia})
      req.flash('certo','Investidor Resgistrado com sucesso');
      resp.redirect('/')
    }
     
     
    }
   

  } catch (error) {
    resp.send(error + " - falha ao registar")
  }
})
Investidor.get('/perfilinvestidor',investidor,async(req:Request, resp: Response)=>{
  const id = req.session?.investidor.id;
  const investidor =  await knex('investidor').where('id',id).first()
resp.render('investidor/perfil',{investidor,certo:req.flash('certo'),errado:req.flash('errado')})
})
Investidor.get('/projectos',investidor,async(req:Request, resp: Response)=>{
  const id = req.session?.investidor.id;
  const investidor =  await knex('investidor').where('id',id).first()
  const projectos = await knex('projectoempresa').join('empresa','projectoempresa.idEmpresa','=','empresa.id').where('estadoProjecto',0)
 
resp.render('investidor/projectos',{investidor,certo:req.flash('certo'),projectos,errado:req.flash('errado')})
})
Investidor.get('/detalhesprojecto/:idprojecto',investidor,async(req:Request, resp: Response)=>{
  const idprojecto = req.params;
  const id = req.session?.investidor.id;
 
  const investidor =  await knex('investidor').where('id',id).first()
   const projecto = await knex('projectoempresa').join('empresa','projectoempresa.idEmpresa','=','empresa.id').where('idProjecto',idprojecto.idprojecto).first()
   const invetimento = await knex('investir').where('idProjectoEmpresa',idprojecto).sum('valorInvestir')
   if(projecto== undefined){
    resp.render('error/404')
   }
const valor= 299
resp.render('investidor/detalhesprojecto',{investidor,certo:req.flash('certo'),errado:req.flash('errado'),projecto,valor})
})

export default Investidor;

//image, name, email, whatsaap, nomeuser senha

