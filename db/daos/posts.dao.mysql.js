import Mysql from '../mysql.js'

class PostsDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'post'
        await this.createTable()
    }

    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                userId INT,                
                FOREIGN KEY (userId) REFERENCES user(id)                
            )`
            await this.mysql.query(query)
            console.log(`Tabla ${this.table} creada o ya existente.`)
        } catch (error) {
            console.error('Error creating table:', error)
            throw error
        }
    }

    async getAllPosts() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getPostById(id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async createPost(title, content, userId, parentMessageId) {
        try {
            const query = `INSERT INTO ${this.table} (title, content, userId) VALUES (?, ?, ?)`
            const values = [title, content, userId]
            const [result] = await this.mysql.query(query, values)
            return result.insertId
        } catch (err) {
            throw err
        }
    }

    async updatePost(id, title, content) {
        try {
            const query = `UPDATE ${this.table} SET title = ?, content = ? WHERE id = ?`
            const values = [title, content, id]
            const [result] = await this.mysql.query(query, values)
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }

    async deletePost(id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default PostsDaoMysql
