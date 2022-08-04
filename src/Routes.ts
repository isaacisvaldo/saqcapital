import {Router, Request, Response} from 'express';
const Route= Router (); 
import knex from './database/conection';
import MarcacaoController from './controller/marcacaoController';
import PacienteController from './controller/pacienteController';
import { authenticate } from './config/loginService';
import MedicoController from './controller/medicoController';
import multerConfig from './config/multer';
import multer from 'multer';
const upload = multer(multerConfig);


//Middlewares
import pacienteAuth from './middlewre/paciente' //medico
import adminAuth from './middlewre/utilizador'
import medicoAuth from './middlewre/medico'






//Rotas Gerais do Sistema
//Login principal
Route.get('/login', (req:Request, resp: Response)=>{
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
    console.log(investidores)

    resp.render('webSite/index',{usuarios,info:req.flash('info'),errado:req.flash('errado'),projectos,empresa,investidores})
})

Route.get('/logout', (req:Request, resp: Response)=>{
    req.session = undefined
    resp.redirect('/')
})

//LOGIN GERAL DO SISTEMA
Route.post('/loginGeral',async (req:Request, resp: Response)=>{ 
    try {
        const {user, pass}= req.body;
        authenticate(user, pass).then(r=>{
            if(r==='-1'){
                req.flash("errado","Erro ao autenticar!")
                resp.redirect('/loginGeral')
                
            }else{
                const dados=r;
                if(dados){
                     if(dados.p === 'paciente'){ 
                        const pc:any = dados
                        if(req.session){
                          req.session.user={role:2, id:pc.pc.idPaciente};
                          resp.redirect('/pacientePainel')
                        }      
                     }else if(dados.p === 'admin'){
                        const adminDados:any = dados
                        if(req.session){
                          req.session.user={role:adminDados.admn.role, id:adminDados.admn.idMedico};
                          console.log(req.session.user);
                          resp.redirect('/adminPainel')
                        } 
                     }else if(dados.p==='medico_normal'){
                        const medico:any= dados
                        if(req.session){
                            req.session.user={role:medico.admn.role, id:medico.admn.idMedico};
                            resp.redirect('/medicoPainel')
                          
                        } 
                    }
                }
            }
        })   
    } catch (error) {
        console.log(error)
    }
})

export default Route;