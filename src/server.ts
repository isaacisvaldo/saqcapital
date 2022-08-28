import express from "express";
import route from './Routes'
import cors from 'cors';
import path from 'path';
import bodyParser from "body-parser";
import flash from 'express-flash'
import session from 'express-session'
import empresaController from './controller/empresaController'
import utilizadorController from './controller/utilizadorController';
import investidorController from './controller/investidorController';
import knex from './database/conection';
import cron  from 'node-cron'
import {addDias, c,day,dataAtual,horatual } from './config/data'

const app= express();
app.use(flash())

app.use(session({
    secret:'saqcapital@isvaldobunga',
    cookie:{maxAge: 3000000000}
}))

app.use('/upload', express.static(path.resolve(__dirname, '..','upload')) );
app.use(express.static(path.resolve(__dirname, '..','public')))
app.set('view engine', 'ejs')
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(route);
app.use(utilizadorController);
app.use(empresaController);
app.use(investidorController);
app.use(async(req,res, next)=>{ 
    
    res.render('error/404')
}) 



app.listen(1004, () => {
    console.log('Rodando Porta 1004');
})