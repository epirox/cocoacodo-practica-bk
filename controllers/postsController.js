import PostsDaoMysql from '../db/daos/posts.dao.mysqli.js';

export default class PostsController {
    constructor() {
        this.db = new PostsDaoMysql();
    }

    getAllPosts = async (req, res) => {
        try {
            const posts = await this.db.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getPostById = async (req, res) => {
        try {
            const { id } = req.params;
            const post = await this.db.getPostById(id);
            if (!post) {
                res.status(404).send('Post not found');
            } else {
                res.json(post);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createPost = async (req, res) => {
        try {
            const { title, content, userId, parentMessageId } = req.body;
            const newPostId = await this.db.createPost(title, content, userId, parentMessageId);
            const newPost = await this.db.getPostById(newPostId);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updatePost = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const updatedRows = await this.db.updatePost(id, title, content);
            if (updatedRows === 0) {
                res.status(404).send('Post not found');
            } else {
                const updatedPost = await this.db.getPostById(id);
                res.json(updatedPost);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    deletePost = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRows = await this.db.deletePost(id);
            if (deletedRows === 0) {
                res.status(404).send('Post not found');
            } else {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}