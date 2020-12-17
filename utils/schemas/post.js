const joi = require('joi');

const tokenSchema = joi.string();
const titleSchema = joi.string().max(70);
const tagsSchema = joi.array().items(joi.string().max(50));
const contentSchema = joi.string();

const createPostSchema = {
  title: titleSchema.required(),
  tags: tagsSchema.required(),
  content: contentSchema.required(),
};

const updatePostSchema = {
  title: titleSchema,
  tags: tagsSchema,
  content: contentSchema,
};

module.exports = { tokenSchema, createPostSchema, updatePostSchema };
