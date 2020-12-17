const express = require('express');
const PostService = require('../services/posts');

const {
  tokenSchema,
  createPostSchema,
  updatePostSchema,
} = require('../utils/schemas/post');

const validationHandler = require('../utils/middlewares/validationHandler');

const blogApi = (app) => {
  const router = express.Router();
  app.use('/api', router);

  const postService = new PostService();

  router.get('/posts', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const id = '';
      let posts = [];

      if (tags != undefined) {
        posts = await postService.getPosts(id, { tags });
      } else {
        posts = await postService.getAllPosts();
      }

      res.status(200).json({
        data: posts,
        message: 'Posts retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/users/:idToken/posts',
    validationHandler({ idToken: tokenSchema }, 'params'),
    async (req, res, next) => {
      const { idToken } = req.params;

      try {
        const posts = await postService.getUserPosts({ idToken });

        res.status(200).json({
          data: posts,
          message: 'Posts retrieved successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/posts/:idPost',
    validationHandler({ idPost: tokenSchema }, 'params'),
    async (req, res, next) => {
      const { idToken } = req.params;
      const { idPost } = req.params;

      try {
        const post = await postService.getPost({ idPost }, { idToken });

        res.status(200).json({
          data: post,
          message: 'Post retrieved successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/:idToken/posts',
    validationHandler({ idToken: tokenSchema }, 'params'),
    validationHandler(createPostSchema),
    async (req, res, next) => {
      const { idToken } = req.params;
      const { body: post } = req;

      try {
        const createdPostId = await postService.createPost(post, { idToken });

        res.status(201).json({
          id: createdPostId,
          message: 'Post created successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:idToken/posts/:idPost',
    validationHandler({ idToken: tokenSchema }, 'params'),
    validationHandler(updatePostSchema),
    async (req, res, next) => {
      const { idToken } = req.params;
      const { idPost } = req.params;
      const { body: post } = req;

      try {
        const updatedUser = await postService.updatePost(
          post,
          { idPost },
          { idToken }
        );

        res.status(200).json({
          data: updatedUser,
          message: 'Post updated successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:idToken/posts',
    validationHandler({ idToken: tokenSchema }, 'params'),
    async (req, res, next) => {
      const { idToken } = req.params;

      try {
        await postService.deleteUserPosts({ idToken });

        res.status(200).json({
          message: 'Posts deleted successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:idToken/posts/:idPost',

    async (req, res, next) => {
      const { idToken } = req.params;
      const { idPost } = req.params;

      try {
        await postService.deletePost({ idPost }, { idToken });

        res.status(200).json({
          message: 'Post deleted successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = blogApi;
