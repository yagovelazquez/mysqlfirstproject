const express = require('express');
const routes = express.Router()

const error = require('./middleware/error')
require('express-async-errors')

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const AdressController = require('./controllers/AddressController');




routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/me', UserController.getUser)
routes.get('/authUserTest', UserController.getUserAfter)




routes.get('/test', UserController.testrender)
routes.post('/test', UserController.test1,UserController.test2)

routes.post('/login', AuthController.auth)
routes.get('/login', AuthController.login)
routes.get('/loginTest', AuthController.authTest)

routes.post('/users/addresses', AdressController.store)
routes.get('/users/addresses', AdressController.getAddress)
routes.get('/users/getaddresses', AdressController.getAddressAfter)






routes.use(error)

module.exports = routes;