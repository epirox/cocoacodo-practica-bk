import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import bodyParser from 'body-parser';
import userRoutes from '../routes/userRoutes.js';
import postsRoutes from '../routes/postRoutes.js';
import mangaRoutes from '../routes/mangaRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';

const { urlencoded, json } = bodyParser;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static('tpl'));

app.get('/', async (req, res) => {
    const filePath = join(__dirname, '..', 'tpl', 'index.html');

    try {
        const data = await fsPromises.readFile(filePath, 'utf8');
        res.send(data);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer el archivo');
    }
});

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/mangas', mangaRoutes);
app.use('/contacto', contactRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}/`);
});
