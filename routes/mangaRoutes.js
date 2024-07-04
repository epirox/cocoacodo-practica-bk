import express from 'express';
import multer from 'multer';
import MangaController from '../controllers/mangaController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/caratulas' });

router.post('/', upload.single('caratula'), (req, res) => MangaController.createManga(req, res));
router.get('/', (req, res) => MangaController.getAllMangas(req, res));
router.get('/:id', (req, res) => MangaController.getMangaById(req, res));
router.put('/:id', upload.single('caratula'), (req, res) => MangaController.updateManga(req, res));
router.delete('/:id', (req, res) => MangaController.deleteManga(req, res));

export default router;
