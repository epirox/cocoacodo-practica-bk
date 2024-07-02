const Mysql = require("../db")

class PostsDaoMysql extends Mysql {
    constructor() {
        super()
        this.table = 'posteos'
        this.createTable()
    }

    createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) not null,
            content TEXT,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES usuarios(id)
        )`
        this.connection.query(query)
    }

    async getAllPosts() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM posteos', (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }

    async getPostById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM posteos WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    if (results.length === 0) {
                        resolve(null)
                    } else {
                        resolve(results[0])
                    }
                }
            })
        })
    }

    async createPost(title, content, userId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO posteos (title, content, user_id) VALUES (?, ?, ?)'
            const values = [title, content, userId]
            this.connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.insertId)
                }
            })
        })
    }

    async updatePost(id, title, content) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE posteos SET title = ?, content = ? WHERE id = ?'
            const values = [title, content, id]
            this.connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.affectedRows)
                }
            })
        })
    }

    async deletePost(id) {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM posteos WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.affectedRows)
                }
            })
        })
    }
}

module.exports = PostsDaoMysql