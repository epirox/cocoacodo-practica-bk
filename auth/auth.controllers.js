import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from './auth.config.js'
import { UserController as usersDB } from '../controllers/user.controller.js';

const register = (req, res) => {

    const { username, password, email } = req.body

    const hash = bcrypt.hashSync(password)

    const user = { username, password: hash, email }
    const result = usersDB.createUser(user)
    
    const signature = config.secretKey
    const payload = { id: user.id, username: user.username }
    const token = jwt.sign(payload, signature, config.token)

    result
        ? res
            .status(201)
            // .set('authorization', `Bearer ${token}`)
            // .cookie('token', token, config.cookie)
            .cookie('token', token, config.cookie)
            .redirect('/')

        : res.send('Algo salió mal. Vuelta atrás e inténtelo de nuevo.')
}

const login = (req, res) => {

    const { username, password } = req.body

    const user = usersDB.getUserByName(username)

    if (!user) return res
        .status(404)
        .json({ error: true, desc: 'User not Found' })

    const isValid = bcrypt.compareSync(password, user.password)

    if (!isValid) return res
        .status(404)
        .json({ error: true, desc: 'Invalid password' })

    const signature = config.secretKey
    const payload = { id: user.id, username: user.username }

    const token = jwt.sign(payload, signature, config.token)

    res
        .status(200)
        // .set('authorization', `Bearer ${token}`)
        .cookie('token', token, config.cookie)
        .redirect('/')
}

export const controllers = {
    register,
    login
}