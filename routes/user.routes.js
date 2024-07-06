import express from 'express'
const routes = express.Router()
import UserController from '../controllers/user.controller.js'
import { middlewares } from '../auth/auth.middlewares.js'

const userController = new UserController()

routes
    .get('/', 
        middlewares.authJWT,
        userController.getAllUsers)

    .get('/:id',
        middlewares.authJWT,
        userController.getUserById)

    .post('/register', userController.createUser)
    .post('/login', userController.validateUser)

    .put('/:id', 
        middlewares.authJWT,
        userController.updateUser)
        
    .delete('/:id', 
        middlewares.authJWT,
        userController.deleteUser)

export default routes
