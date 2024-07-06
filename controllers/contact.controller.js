import ContactDaoMysql from '../db/daos/contact.dao.mysql.js';

class ContactController {
    constructor() {
        this.contactDao = new ContactDaoMysql();
    }

    async createContact(req, res) {
        const { name, topic, query, tyc } = req.body;
        const attachment = req.file ? req.file.path : null;

        try {
            const newContactId = await this.contactDao.createContact(name, topic, query, tyc === 'on', attachment);
            res.status(201).json({ id: newContactId });
        } catch (error) {
            console.error('Error creando contact:', error);
            res.status(500).json({ error: 'Error creando contact' });
        }
    }

    async getAllContacts(req, res) {
        try {
            const contacts = await this.contactDao.getAllContacts();
            res.status(200).json(contacts);
        } catch (error) {
            console.error('Error obteniendo contacts:', error);
            res.status(500).json({ error: 'Error obteniendo contacts' });
        }
    }

    async getContactById(req, res) {
        const { id } = req.params;

        try {
            const contact = await this.contactDao.getContactById(id);
            if (contact) {
                res.status(200).json(contact);
            } else {
                res.status(404).json({ error: 'Contact no encontrado' });
            }
        } catch (error) {
            console.error('Error obteniendo contact:', error);
            res.status(500).json({ error: 'Error obteniendo contact' });
        }
    }

    async updateContact(req, res) {
        const { id } = req.params;
        const { name, topic, query, tyc } = req.body;
        const attachment = req.file ? req.file.path : null;

        try {
            const affectedRows = await this.contactDao.updateContact(id, name, topic, query, tyc === 'on', attachment);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Contact actualizado' });
            } else {
                res.status(404).json({ error: 'Contact no encontrado' });
            }
        } catch (error) {
            console.error('Error actualizando contact:', error);
            res.status(500).json({ error: 'Error actualizando contact' });
        }
    }

    async deleteContact(req, res) {
        const { id } = req.params;

        try {
            const affectedRows = await this.contactDao.deleteContact(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Contact eliminado' });
            } else {
                res.status(404).json({ error: 'Contact no encontrado' });
            }
        } catch (error) {
            console.error('Error eliminando contact:', error);
            res.status(500).json({ error: 'Error eliminando contact' });
        }
    }
}

export default new ContactController();
