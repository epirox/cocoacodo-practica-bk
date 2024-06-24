const express = require('express')
const app = express()
const PORT = 3000
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const userRoutes = require("../routes/userRoutes")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'tpl', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Error al leer el archivo');
            return;
        }

        res.send(data);
    });
})

app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}/`)
})