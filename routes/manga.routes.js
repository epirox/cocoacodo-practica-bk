import express from 'express';
import multer from 'multer';
import MangaController from '../controllers/manga.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/covers' });

router.post('/', upload.single('cover'), (req, res) => MangaController.createManga(req, res));
router.get('/', (req, res) => MangaController.getAllMangas(req, res));
router.get('/:id', (req, res) => MangaController.getMangaById(req, res));
router.put('/:id', upload.single('cover'), (req, res) => MangaController.updateManga(req, res));
router.delete('/:id', (req, res) => MangaController.deleteManga(req, res));

export default router;
