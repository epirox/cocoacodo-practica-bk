import Mysql from '../mysql.js';

class MangaDaoMysql {
    constructor() {
        this.initialize();
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance();
        this.mysql = mysqlInstance.connection;
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
                idusuario INT,
                FOREIGN KEY (idusuario) REFERENCES usuarios(id)
            )`;
            await this.mysql.query(query);
            console.log("Tabla de mangas creada o ya existente.");
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    async getAllMangas() {
        try {
            const [results] = await this.mysql.query('SELECT * FROM mangas');
            return results;
        } catch (err) {
            throw err;
        }
    }

    async getMangaById(id) {
        try {
            const [results] = await this.mysql.query('SELECT * FROM mangas WHERE id = ?', [id]);
            return results[0];
        } catch (err) {
            throw err;
        }
    }

    async createManga(src, title, description, gen, idusuario) {
        try {
            const query = 'INSERT INTO mangas (src, title, description, gen, idusuario) VALUES (?, ?, ?, ?, ?)';
            const values = [src, title, description, JSON.stringify(gen), idusuario];
            const [result] = await this.mysql.query(query, values);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    async updateManga(id, src, title, description, gen, idusuario) {
        try {
            const query = 'UPDATE mangas SET src = ?, title = ?, description = ?, gen = ?, idusuario = ? WHERE id = ?';
            const values = [src, title, description, JSON.stringify(gen), idusuario, id];
            const [result] = await this.mysql.query(query, values);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async deleteManga(id) {
        try {
            const [result] = await this.mysql.query('DELETE FROM mangas WHERE id = ?', [id]);
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

export default MangaDaoMysql;
