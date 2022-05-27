// O TIPO DE ROTA VAI DECIDIR QUAL CONTROLLER VAI SER UTILIZADO NAQUELA ROTA
// O TRABALHO DO CONTROLLER É ESCOLHER O MODEL E O VIEW QUE VÃO SER UTILIZADOS

const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')

//Rotas da home
route.get('/', homeController.homePage)
route.post('/', homeController.trataPost)

//Rotas de contato
route.get('/contato', contatoController.homePage)

module.exports = route