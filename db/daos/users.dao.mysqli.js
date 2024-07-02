const Mysql = require ("../db");

class UsersDaoMysql extends Mysql {

    constructor() {
        super();
        this.table = 'usuarios';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL
        )`;
        this.connection.query(query, (err, results) => {
            if (err) throw err;
            console.log("Tabla creada o ya existente:", results);
        });
    }

    getAllUsers = () => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table}`, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    getUserById = (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    createUser = (name, age) => {
        return new Promise((resolve, reject) => {
            const user = { name, age };
            this.connection.query(`INSERT INTO ${this.table} SET ?`, user, (err, results) => {
                if (err) reject(err);
                resolve(results.insertId);
            });
        });
    }

    updateUser = (id, name, age) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ${this.table} SET name = ?, age = ? WHERE id = ?`, [name, age, id], (err, results) => {
                if (err) reject(err);
                resolve(results.affectedRows);
            });
        });
    }

    deleteUser = (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id], (err, results) => {
                if (err) reject(err);
                resolve(results.affectedRows);
            });
        });
    }
}

module.exports = UsersDaoMysql;