import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Mysql {
    constructor() {
        if (Mysql.instance) {
            return Mysql.instance;
        }

        this.connection = null;
        this.initialized = this.initialize();

        Mysql.instance = this;
    }

    async initialize() {
        const DB_HOST = process.env.DB_HOST || 'localhost';
        const DB_USER = process.env.DB_USER || 'root';
        const DB_PASSWORD = process.env.DB_PASSWORD || 'pass';
        const DB_NAME = process.env.DB_NAME || 'mangaProject';

        try {
            this.connection = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME
            });
            console.log('Connected to the database.');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async query(sql, params) {        
        if (!this.isConnected()) {
            this.initialize();
        }
        await this.initialized;

        try {
            const results = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Query error:', error);
            throw error;
        }
    }

    isConnected() {
        return this.connection && this.connection.connection._closing === false;
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
        }
    }

    static async getInstance() {
        if (!Mysql.instance) {
            Mysql.instance = new Mysql();
        }
        await Mysql.instance.initialized;
        return Mysql.instance;
    }
}

export default Mysql;
