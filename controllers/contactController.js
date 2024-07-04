import ContactoDaoMysql from '../db/daos/contacto.dao.mysql.js';

class ContactController {
    constructor() {
        this.contactoDao = new ContactoDaoMysql();
    }

    async createContacto(req, res) {
        const { nombre, tema, consulta, tyc } = req.body;
        const adjunto = req.file ? req.file.path : null;

        try {
            const newContactoId = await this.contactoDao.createContacto(nombre, tema, consulta, tyc === 'on', adjunto);
            res.status(201).json({ id: newContactoId });
        } catch (error) {
            console.error('Error creando contacto:', error);
            res.status(500).json({ error: 'Error creando contacto' });
        }
    }

    async getAllContactos(req, res) {
        try {
            const contactos = await this.contactoDao.getAllContactos();
            res.status(200).json(contactos);
        } catch (error) {
            console.error('Error obteniendo contactos:', error);
            res.status(500).json({ error: 'Error obteniendo contactos' });
        }
    }

    async getContactoById(req, res) {
        const { id } = req.params;

        try {
            const contacto = await this.contactoDao.getContactoById(id);
            if (contacto) {
                res.status(200).json(contacto);
            } else {
                res.status(404).json({ error: 'Contacto no encontrado' });
            }
        } catch (error) {
            console.error('Error obteniendo contacto:', error);
            res.status(500).json({ error: 'Error obteniendo contacto' });
        }
    }

    async updateContacto(req, res) {
        const { id } = req.params;
        const { nombre, tema, consulta, tyc } = req.body;
        const adjunto = req.file ? req.file.path : null;

        try {
            const affectedRows = await this.contactoDao.updateContacto(id, nombre, tema, consulta, tyc === 'on', adjunto);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Contacto actualizado' });
            } else {
                res.status(404).json({ error: 'Contacto no encontrado' });
            }
        } catch (error) {
            console.error('Error actualizando contacto:', error);
            res.status(500).json({ error: 'Error actualizando contacto' });
        }
    }

    async deleteContacto(req, res) {
        const { id } = req.params;

        try {
            const affectedRows = await this.contactoDao.deleteContacto(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Contacto eliminado' });
            } else {
                res.status(404).json({ error: 'Contacto no encontrado' });
            }
        } catch (error) {
            console.error('Error eliminando contacto:', error);
            res.status(500).json({ error: 'Error eliminando contacto' });
        }
    }
}

export default new ContactController();
