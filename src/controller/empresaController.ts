import knex from '../database/conection';
import multer from 'multer'
import multerConfig from '../config/multer';
import { Response, Request, Router } from  "express";
// import bCryptjs from 'bcryptjs'
const upload = multer(multerConfig);
const Empresa=Router();

import empresa from '../middlewre/empresa'



Empresa.post('/cadastarEmpresa',async(req:Request, resp: Response)=>{
  try {
    const {nome,email,tell,senha,senha2,provincia,municipio,endereco,website,nif,descricao_projecto}= req.body; 
  
    if(nome===""||nif===""||email===""||tell===""||senha==="" ||senha!=senha2 ){
      req.flash('', 'Ocorreu um problema');
      resp.redirect('/listarEspecialidade')
    }else{
      const verify = await knex('empresa').where('email',email).orWhere('tell',tell)
      const verify1 = await knex('investidor').where('email',email).orWhere('tell',tell)
      const verify2 = await knex('empresa').where('email',email).orWhere('tell',tell)
      if(verify.length!==0||verify1.length!==0||verify2.length!==0){
        req.flash('errado','Ocorreu um problema');
      resp.redirect('/contaempresa')
    }else{
      const image= (req.file) ? req.file.filename: 'empresa.jpg';
      const empresa = await knex('empresa').insert({image,nome,nif,website,email,tell,senha,estado:1,provincia,municipio,endereco,descricao_projecto})
      req.flash('certo','Empresa Resgistrado com sucesso');
      resp.redirect('/')
    }
     
     
    }
   

  } catch (error) {
    resp.send(error + " - falha ao registar")
  }
})
Empresa.get('/perfilempresa',empresa,async(req:Request, resp: Response)=>{
  const id = req.session?.empresa.id;
  const empresa =  await knex('empresa').where('id',id).first()
resp.render('empresa/perfilempresa',{empresa,certo:req.flash('certo'),errado:req.flash('errado')})
})
Empresa.get('/meusprojectos',empresa,async(req:Request, resp: Response)=>{
  const id = req.session?.empresa.id;
  const empresa =  await knex('empresa').where('id',id).first()
  const projectos =await knex('projectoempresa').where('idEmpresa',id).select('*')
resp.render('empresa/projectos',{empresa,projectos,certo:req.flash('certo'),errado:req.flash('errado')})
})
Empresa.get('/novosprojectos',empresa,async(req:Request, resp: Response)=>{
  const id = req.session?.empresa.id;
  const empresa =  await knex('empresa').where('id',id).first()

resp.render('empresa/formProjecto',{empresa,certo:req.flash('certo'),errado:req.flash('errado')})
})

Empresa.post('/novosprojectos',empresa,upload.single('image'),async(req:Request, resp: Response)=>{
  try {
  
    const {nome_projecto,participantes,linkurl,descricao_projecto,valorInvestir}= req.body; 
    const idEmpresa =req.session?.empresa.id;
  
    if(nome_projecto===""||participantes===""||descricao_projecto===""||valorInvestir===""){
      req.flash('', 'Ocorreu um problema');
      resp.redirect('/novosprojectos')
    }else{
    
     
      const image_projecto= (req.file) ? req.file.filename: 'empresa.jpg';
      const pje = await knex('projectoempresa').insert({nome_projecto,participantes,image_projecto,descricao_projecto,linkurl,valorInvestir,idEmpresa,estado:0})
      req.flash('certo','Empresa Resgistrado com sucesso');
      resp.redirect('/meusprojectos')
   
     
     
    }
   
  
  } catch (error) {
    resp.send(error + " - falha ao registar")
  }
})
Empresa.get('/visaogeral',empresa,async(req:Request, resp: Response)=>{
  const id = req.session?.empresa.id;
  const empresa =  await knex('empresa').where('id',id).first()

resp.render('empresa/dashboard',{empresa,certo:req.flash('certo'),errado:req.flash('errado')})
})



export default Empresa;

//image, name, email, whatsaap, nomeuser senha

