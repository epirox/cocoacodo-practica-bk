const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

app.get('/users', userController.getAllUsers)

app.get('/users/:id', userController.getUserById)

app.post('/users', userController.createUser)

app.put('/users/:id', userController.updateUser)

app.delete('/users/:id', userController.deleteUser)

module.exports = router