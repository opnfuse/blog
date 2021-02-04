const express = require('express');
const BlogService = require('../services/blog');

const {
  tokenSchema,
  createUserSchema,
  updateUserSchema,
} = require('../utils/schemas/user');

const validationHandler = require('../utils/middlewares/validationHandler');

const blogApi = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  const blogService = new BlogService();

  router.get(
    '/:idToken',
    validationHandler({ idToken: tokenSchema }, 'params'),
    async (req, res, next) => {
      const { idToken } = req.params;

      try {
        const user = await blogService.getUser({ idToken });

        res.status(200).json({
          data: user,
          message: 'User retrieved successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/:idToken',
    validationHandler({ idToken: tokenSchema }, 'params'),
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { idToken } = req.params;
      const { body: user } = req;

      try {
        await blogService.createUser(user, { idToken });

        res.status(201).json({
          id: idToken,
          message: 'User created successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:idToken',
    validationHandler({ idToken: tokenSchema }, 'params'),
    validationHandler(updateUserSchema),
    async (req, res, next) => {
      const { idToken } = req.params;
      const { body: user } = req;

      try {
        const updatedUser = await blogService.updateUser(user, { idToken });

        res.status(200).json({
          data: updatedUser,
          message: 'User updated successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:idToken',
    validationHandler({ idToken: tokenSchema }, 'params'),
    async (req, res, next) => {
      const { idToken } = req.params;

      try {
        await blogService.deleteUser({ idToken });

        res.status(200).json({
          message: 'User deleted successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = blogApi;
