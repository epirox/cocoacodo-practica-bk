const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/postsController');

const postsController = new PostsController();

router.get('/posts', postsController.getAllPosts);
router.get('/posts/:id', postsController.getPostById);
router.post('/posts', postsController.createPost);
router.put('/posts/:id', postsController.updatePost);
router.delete('/posts/:id', postsController.deletePost);

module.exports = router;
