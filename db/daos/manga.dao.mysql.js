import Mysql from '../mysql.js';

class MangaDaoMysql {
    constructor() {
        this.initialize();
    }

    async initialize() {
        this.mysql = await Mysql.getInstance();
        this.table = 'mangas';
        await this.createTable();
    }

    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT PRIMARY KEY AUTO_INCREMENT,
                src VARCHAR(255),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                gen JSON,
                userId INT,
                FOREIGN KEY (userId) REFERENCES user(id)
            )`;
            await this.mysql.query(query);
            console.log(`Tabla ${this.table} creada o ya existente.`);
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllMangas() {
        try {           
            const [result] = await this.mysql.query(`SELECT * FROM ${this.table}`);
            return result;
        } catch (err) {
            console.error('Error in getAllMangas DAO method:', {
                message: err.message,
                stack: err.stack,
                code: err.code
            });
            throw err;
        }
    }

    async getMangaById(id) {
        try {
            const [result] = await this.mysql.query(`SELECT * FROM ${this.table}  WHERE id = ?`, [id]);
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    async createManga(src, title, description, gen, userId) {
        try {
            const query = `INSERT INTO ${this.table}  (src, title, description, gen, userId) VALUES (?, ?, ?, ?, ?)`;
            const values = [src, title, description, JSON.stringify(gen), userId];
            const [result] = await this.mysql.query(query, values);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    async updateManga(id, src, title, description, gen, userId) {
        try {
            const query = `UPDATE ${this.table}  SET src = ?, title = ?, description = ?, gen = ?, userId = ? WHERE id = ?`;
            const values = [src, title, description, JSON.stringify(gen), userId, id];
            const [result] = await this.mysql.query(query, values);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async deleteManga(id) {
        try {
            const mysql = await this.mysql;
            const [result] = await this.mysql.query(`DELETE FROM ${this.table}  WHERE id = ?`, [id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

export default MangaDaoMysql;
