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

    static async getInstance() {
        if (!Mysql.instance) {
            Mysql.instance = new Mysql();
        }
        await Mysql.instance.initialized;
        return Mysql.instance;
    }
}

export default Mysql;
