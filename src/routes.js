const express = require('express');
const routes = express.Router()

const error = require('./middleware/error')
require('express-async-errors')

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');


routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.post('/login', AuthController.auth)







routes.use(error)

module.exports = routes;