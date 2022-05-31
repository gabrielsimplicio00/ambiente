require('dotenv').config()
const express = require('express')
const app = express()
// MODELAR A BASE DE DADOS E PRESERVAR OS DADOS (SCHEMA)
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    app.emit('pronto') // EMITE UM EVENTO ('PRONTO')
}). catch(e => console.log(e))
const session = require('express-session') 
const MongoStore = require('connect-mongo') // AS SESSÕES SERÃO SALVAS NA BASE DE DADOS
const flash = require('connect-flash') // FLASH MESSAGES (MSGS AUTODRESTUTIVAS)
const routes = require('./routes') // ROTAS DA APLICAÇÃO
const path = require('path')
//const helmet = require('helmet')
const csrf = require('csurf')
const {middlewareGlobal, checkCSRFError, CSRFMiddleware} = require('./src/middlewares/middlewares') // FUNÇÕES QUE SÃO EXECUTADAS NA ROTA (PODE EXECUTAR NO MEIO DO CAMINHO)
const { cookie } = require('express/lib/response')

//app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public')) // PEGA ARQUIVOS ESTÁTICOS

//CONFIGURAÇÃO DE SESSÕES
const sessionOptions = session({
    secret: 'qualquer coisa',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

app.set('views', './src/views') // ARQUIVOS QUE RENDERIZAMOS NA TELA
app.set('view engine', 'ejs') // ENGIGE QUE ESTAMOS USANDO PARA RENDERIZAR O HTML (NESSE CASO EJS)

app.use(csrf()) // CONFIGURANDO O CSRF TOKEN
// Nossos próprios middlewares
app.use(middlewareGlobal)
app.use(checkCSRFError)
app.use(CSRFMiddleware)
app.use(routes)

//MANDANDO NOSSA APLICAÇÃO ESCUTAR UMA REQUISIÇÃO E ESPERAR PELO EMIT DO MONGOOSE
app.on('pronto', ()=>{
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000')
    })
})

