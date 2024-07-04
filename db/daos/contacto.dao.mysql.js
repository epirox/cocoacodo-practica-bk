import Mysql from '../mysql.js';

class ContactoDaoMysql {
    constructor() {
        this.initialize();
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance();
        this.mysql = mysqlInstance.connection;
        this.table = 'contacto';
        await this.createTable();
    }

    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(255) NOT NULL,
                tema VARCHAR(255) NOT NULL,
                consulta TEXT NOT NULL,
                tyc BOOLEAN NOT NULL,
                adjunto VARCHAR(255)
            )`;
            await this.mysql.query(query);
            console.log("Tabla 'contacto' creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllContactos() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`);
            return results;
        } catch (err) {
            throw err;
        }
    }

    async getContactoById(id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
            return results[0];
        } catch (err) {
            throw err;
        }
    }

    async createContacto(nombre, tema, consulta, tyc, adjunto) {
        try {
            const query = `INSERT INTO ${this.table} (nombre, tema, consulta, tyc, adjunto) VALUES (?, ?, ?, ?, ?)`;
            const values = [nombre, tema, consulta, tyc, adjunto];
            const [result] = await this.mysql.query(query, values);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    async updateContacto(id, nombre, tema, consulta, tyc, adjunto) {
        try {
            const query = `UPDATE ${this.table} SET nombre = ?, tema = ?, consulta = ?, tyc = ?, adjunto = ? WHERE id = ?`;
            const values = [nombre, tema, consulta, tyc, adjunto, id];
            const [result] = await this.mysql.query(query, values);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async deleteContacto(id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

export default ContactoDaoMysql;
