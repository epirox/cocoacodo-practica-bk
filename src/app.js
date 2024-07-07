import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import { config } from '../auth/auth.config.js'
import cookieParser from 'cookie-parser'

import userRoutes from '../routes/user.routes.js'
import postsRoutes from '../routes/post.routes.js'
import mangaRoutes from '../routes/manga.routes.js'
import contactRoutes from '../routes/contact.routes.js'


const { urlencoded, json } = bodyParser

const app = express()
const PORT = process.env.PORT || 3000

/*
const allowedOrigins = ['http://127.0.0.1:5500','http://localhost', 'https://projectmanga.netlify.app']
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'El origen ' + origin + ' no está permitido por la política CORS'
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }
}
app.use(cors(corsOptions))*/


app.use(cookieParser(config.secretKey))

app.use(express.static('tpl'))
app.use(urlencoded({ extended: true }))
app.use(json())



app.get('/', async (req, res) => {
    const filePath = join(__dirname, '..', 'tpl', 'index.html')

    try {
        const data = await fsPromises.readFile(filePath, 'utf8')
        res.send(data)
    } catch (err) {
        console.error('Error al leer el archivo:', err)
        res.status(500).send('Error al leer el archivo')
    }
})

app.use('/users', userRoutes)
app.use('/posts', postsRoutes)
app.use('/mangas', mangaRoutes)
app.use('/contact', contactRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}/`)
})
