const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Importa las rutas de usuarios desde userRoutes.js
const userRoutes = require('./routes/userRoutes');

// Middleware para procesar body de solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta de inicio que devuelve un archivo HTML
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
});

// Monta las rutas del usuario bajo el prefijo /users
app.use('/users', userRoutes);

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}/`);
});
