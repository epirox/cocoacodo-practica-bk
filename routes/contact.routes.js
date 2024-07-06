import express from 'express';
import multer from 'multer';
import ContactController from '../controllers/contact.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/contact' });

router.post('/', upload.single('attachment'), (req, res) => ContactController.createContact(req, res));
router.get('/', (req, res) => ContactController.getAllContacts(req, res));
router.get('/:id', (req, res) => ContactController.getContactById(req, res));
router.put('/:id', upload.single('attachment'), (req, res) => ContactController.updateContact(req, res));
router.delete('/:id', (req, res) => ContactController.deleteContact(req, res));

export default router;
