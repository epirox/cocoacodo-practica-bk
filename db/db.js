const mysql = require('mysql2')

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'pass'
const DB_NAME = process.env.DB_NAME || 'mangaProject'

const connection = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME
})

connection.connect((err) => {
    if(err){
        console.error('Error conecting to the database: ', err)
        return
    }
    console.log('Conected to the database.')
})

module.exports = connection