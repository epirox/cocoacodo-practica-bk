import MangaDaoMysql from '../db/daos/manga.dao.mysql.js';

class MangaController {
    constructor() {
        this.mangaDao = new MangaDaoMysql();
    }

    async createManga(req, res) {
        const { title, description, gen, userId} = req.body;
        const src = req.file ? req.file.path : null;

        try {
            const newMangaId = await this.mangaDao.createManga(src, title, description, gen, userId);
            res.status(201).json({ id: newMangaId });
        } catch (error) {
            console.error('Error creando manga:', error);
            res.status(500).json({ error: 'Error creando manga' });
        }
    }

    async getAllMangas(req, res) {
        try {
            const mangas = await this.mangaDao.getAllMangas();
            res.status(200).json(mangas);
        } catch (error) {
            console.error('Error obteniendo mangas:', error);
            res.status(500).json({ error: 'Error obteniendo mangas' });
        }
    }

    async getMangaById(req, res) {
        const { id } = req.params;

        try {
            const manga = await this.mangaDao.getMangaById(id);
            if (manga) {
                res.status(200).json(manga);
            } else {
                res.status(404).json({ error: 'Manga no encontrado' });
            }
        } catch (error) {
            console.error('Error obteniendo manga:', error);
            res.status(500).json({ error: 'Error obteniendo manga' });
        }
    }

    async updateManga(req, res) {
        const { id } = req.params;
        const { title, description, gen, userId } = req.body;
        const src = req.file ? req.file.path : null;

        try {
            const affectedRows = await this.mangaDao.updateManga(id, src, title, description, gen, userId);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Manga actualizado' });
            } else {
                res.status(404).json({ error: 'Manga no encontrado' });
            }
        } catch (error) {
            console.error('Error actualizando manga:', error);
            res.status(500).json({ error: 'Error actualizando manga' });
        }
    }

    async deleteManga(req, res) {
        const { id } = req.params;

        try {
            const affectedRows = await this.mangaDao.deleteManga(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Manga eliminado' });
            } else {
                res.status(404).json({ error: 'Manga no encontrado' });
            }
        } catch (error) {
            console.error('Error eliminando manga:', error);
            res.status(500).json({ error: 'Error eliminando manga' });
        }
    }
}

export default new MangaController();
