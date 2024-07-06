import express from 'express'
const routes = express.Router()
import UserController from '../controllers/user.controller.js'

const userController = new UserController()

routes
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserById)
    .post('/register', userController.createUser)
    .post('/login', userController.validateUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

export default routes
