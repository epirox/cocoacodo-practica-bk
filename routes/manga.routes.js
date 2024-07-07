import express from 'express'
import multer from 'multer'
import MangaController from '../controllers/manga.controller.js'
import { promises as fs } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const upload = multer({ dest: 'uploads/covers' })

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsDir = join(__dirname, '..', 'uploads', 'covers');

router
    .post('/', upload.single('cover'), (req, res) => MangaController.createManga(req, res))
    .get('/', (req, res) => MangaController.getAllMangas(req, res))
    .get('/:id', (req, res) => MangaController.getMangaById(req, res))
    .put('/:id', upload.single('cover'), (req, res) => MangaController.updateManga(req, res))
    .delete('/:id', (req, res) => MangaController.deleteManga(req, res)) 
    .get('/uploads/covers/:image', (req, res) => {
        const imageName = req.params.image
        const imagePath = join(uploadsDir, imageName)

        fs.access(imagePath, fs.constants.F_OK)
            .then(() => {
                res.setHeader('Content-Type', 'image/jpeg')
                res.sendFile(imagePath)
            })
            .catch((err) => {
                console.error('Error al acceder a la imagen:', err)
                res.status(404).json({ error: 'Imagen no encontrada' })
            })
    })
export default router
