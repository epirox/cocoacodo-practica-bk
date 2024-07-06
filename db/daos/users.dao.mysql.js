import Mysql from '../mysql.js'

class UsersDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'user'
        await this.#createTable()
    }

    async #createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE
            )`
            await this.mysql.query(query)
            console.log(`Tabla ${this.table} creada o ya existente.`)
        } catch (error) {
            console.error('Error creating table:', error)
            throw error
        }
    }

    async getAllUsers() {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table}`)
            return results
        } catch (err) {
            throw err
        }
    }

    async getUserById(id) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async getUserByUsername(username) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE username = ?`, [username])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async getUserByEmail(email) {
        try {
            const [results] = await this.mysql.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
            return results[0]
        } catch (err) {
            throw err
        }
    }

    async existUserByUsername(username) {
        const query = `SELECT * FROM ${this.table} WHERE username = ?`
        const [rows] = await this.connection.execute(query, [username])
        return rows.length > 0
    }

    async existUserByEmail(email) {
        const query = `SELECT * FROM ${this.table} WHERE email = ?`
        const [rows] = await this.connection.execute(query, [email])
        return rows.length > 0
    }

    async createUser(username, password, email) {
        try {
            const user = [username, password, email]
            const [result] = await this.mysql.query(`INSERT INTO ${this.table} (username, password, email) VALUES (?, ?, ?)`, user)
            return result.insertId
        } catch (err) {
            throw err
        }
    }

    async updateUser(id, username, password) {
        try {
            const [result] = await this.mysql.query(`UPDATE ${this.table} SET username = ?, password = ?, email = ? WHERE id = ?`, [username, password, email, id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }

    async deleteUser(id) {
        try {
            const [result] = await this.mysql.query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
            return result.affectedRows
        } catch (err) {
            throw err
        }
    }
}

export default UsersDaoMysql
