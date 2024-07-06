import Mysql from '../mysql.js';

class ContactDaoMysql {
    constructor() {
        this.initialize();
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance();
        this.mysql = mysqlInstance.connection;
        this.table = 'contact';
        await this.createTable();
    }

    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                topic VARCHAR(255) NOT NULL,
                query TEXT NOT NULL,
                tyc BOOLEAN NOT NULL,
                attachment VARCHAR(255)
            )`;
            await this.mysql.query(query);
            console.log(`Tabla ${this.table} creada o ya existente.`);
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllContacts() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`);
            return results;
        } catch (err) {
            throw err;
        }
    }

    async getContactById(id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
            return results[0];
        } catch (err) {
            throw err;
        }
    }

    async createContact(name, topic, query, tyc, attachment) {
        try {
            const query = `INSERT INTO ${this.table} (name, topic, query, tyc, attachment) VALUES (?, ?, ?, ?, ?)`;
            const values = [name, topic, query, tyc, attachment];
            const [result] = await this.mysql.query(query, values);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    async updateContact(id, name, topic, query, tyc, attachment) {
        try {
            const query = `UPDATE ${this.table} SET name = ?, topic = ?, query = ?, tyc = ?, attachment = ? WHERE id = ?`;
            const values = [name, topic, query, tyc, attachment, id];
            const [result] = await this.mysql.query(query, values);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async deleteContact(id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

export default ContactDaoMysql;
