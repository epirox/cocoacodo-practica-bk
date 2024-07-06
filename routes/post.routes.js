import express from 'express';
const router = express.Router();
import PostsController from '../controllers/posts.controller.js';

const postsController = new PostsController();

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

export default router;