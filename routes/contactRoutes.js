import express from 'express';
import multer from 'multer';
import ContactController from '../controllers/contactController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/contact' });

router.post('/', upload.single('adjunto'), (req, res) => ContactController.createContacto(req, res));
router.get('/', (req, res) => ContactController.getAllContactos(req, res));
router.get('/:id', (req, res) => ContactController.getContactoById(req, res));
router.put('/:id', upload.single('adjunto'), (req, res) => ContactController.updateContacto(req, res));
router.delete('/:id', (req, res) => ContactController.deleteContacto(req, res));

export default router;
