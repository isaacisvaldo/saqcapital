import knex from '../database/conection';
import multer from 'multer'
import multerConfig from '../config/multer';
import { Response, Request, Router } from  "express";
// import bCryptjs from 'bcryptjs'
const upload = multer(multerConfig);
const Utilizador=Router();

import utilizador from '../middlewre/utilizador'



Utilizador.post('/cadastarUtilizador',async(req:Request, resp: Response)=>{
  try {
    const {nome,username,email,tell,genero,senha,senha2,nascimento,provincia,municipio,endereco}= req.body; 
    var dat3 = new Date();
    var ano = (dat3.getFullYear());
    var c =nascimento.split("-");
    var a =parseInt(c[0]);
    var idade = ano-a ;
    if(nome===""||username===""||email===""||tell===""||genero===""||senha==="" ||senha!=senha2 || idade <16||idade >90){
      req.flash('errado', 'Ocorreu um problema');
      resp.redirect('/listarEspecialidade')
    }else{
      const verify = await knex('utilizador').where('username', username).orWhere('email',email).orWhere('tell',tell)
      const verify1 = await knex('investidor').where('username', username).orWhere('email',email).orWhere('tell',tell)
      const verify2 = await knex('empresa').where('email',email).orWhere('tell',tell)
      if(verify.length!==0||verify1.length!==0||verify2.length!==0){
        req.flash('errado','Ocorreu um problema');
      resp.redirect('/conta')
    }else{
      const image= (req.file) ? req.file.filename: 'user.png';
      const utilizador = await knex('utilizador').insert({image,nome,username,email,tell,genero,senha,estado:1,nascimento,provincia,municipio,endereco})
      req.flash('certo','Utilizador Cadastrado');
      resp.redirect('/login')
    }
     
     
    }
   

  } catch (error) {
    resp.send(error + " - falha ao registar")
  }
})


export default Utilizador;

//image, name, email, whatsaap, nomeuser senha

