import Mysql from '../mysql.js'

class UsersDaoMysql {
    constructor() {
        this.initialize()
    }

    async initialize() {
        const mysqlInstance = await Mysql.getInstance()
        this.mysql = mysqlInstance.connection
        this.table = 'usuarios'
        await this.#createTable()
    }

    async #createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                age INT NOT NULL
            )`
            await this.mysql.query(query)
            console.log("Tabla creada o ya existente.")
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

    async createUser(name, age) {
        try {
            const user = { name, age }
            const [result] = await this.mysql.query(`INSERT INTO ${this.table} SET ?`, user)
            return result.insertId
        } catch (err) {
            throw err
        }
    }

    async updateUser(id, name, age) {
        try {
            const [result] = await this.mysql.query(`UPDATE ${this.table} SET name = ?, age = ? WHERE id = ?`, [name, age, id])
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
