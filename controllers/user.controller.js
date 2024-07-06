import UsersDaoMysql from '../db/daos/users.dao.mysql.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../auth/auth.config.js'

export default class UserController {
    constructor() {
        this.db = new UsersDaoMysql()
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.db.getAllUsers()
            res.json(users)
        } catch (error) {
            res.status(500).json({ error: error.messpassword })
        }
    }

    getUserById = async (req, res) => {
        try {
            const { id } = req.params

            if (!id ) {
                return res.status(400).json({ error: 'Faltan datos necesarios' });
            }

            const user = await this.db.getUserById(id)
            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.json(user)
            }
        } catch (error) {
            res.status(500).json({ error: error.messpassword })
        }
    }

    getUserByName = async (req, res) => {
        try {
            const { username } = req.params

            if (!username ) {
                return res.status(400).json({ error: 'Faltan datos necesarios' });
            }

            const user = await this.db.getUserByUsername(username)
            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.json(user)
            }
        } catch (error) {
            res.status(500).json({ error: error.messpassword })
        }
    }

    createUser = async (req, res) => {
        try {
            const { username, password, email } = req.body;

            if (!username || !password || !email) {
                return res.status(400).json({ error: 'Faltan datos necesarios' });
            }

            const hash = bcrypt.hashSync(password, 10)


            const result = await this.db.createUser(username, hash, email);
            console.log('Resultado de la creación del usuario:', result);
            
            const signature = config.secretKey
            const payload = { id: result, username: username }
            const token = jwt.sign(payload, signature, config.token)
            
            console.log(token)

            if (result) {
                res.status(201)
                .set('authorization', `Bearer ${token}`)
                .cookie('token', token, config.cookie)
                .redirect('/')
                //.json({ message: 'Usuario creado exitosamente' });
            } else {
                res.status(500).json({ error: 'No se pudo crear el usuario' });
            }
        } catch (error) {
            console.error('Error en createUser:', error);
            res.status(500).json({ error: error.message || 'Error interno del servidor' });
        }
    }

    validateUser = async (req, res) => {

        const { username, password } = req.body
        if (!username || !password ) {
            return res.status(400).json({ error: 'Faltan datos necesarios' });
        }
        const user = await this.db.getUserByUsername(username)
    
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
            //.set('authorization', `Bearer ${token}`)
            .cookie('token', token, config.cookie)
            .redirect('/')
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params
            const { username, password, email } = req.body
            const updatedRows = await this.db.updateUser(id, username, password, email)
            if (updatedRows === 0) {
                res.status(404).send('User not found')
            } else {
                const updatedUser = await this.db.getUserById(id)
                res.json(updatedUser)
            }
        } catch (error) {
            res.status(500).json({ error: error.messpassword })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params
            const deletedRows = await this.db.deleteUser(id)
            if (deletedRows === 0) {
                res.status(404).send('User not found')
            } else {
                res.status(204).send()
            }
        } catch (error) {
            res.status(500).json({ error: error.messpassword })
        }
    }
}