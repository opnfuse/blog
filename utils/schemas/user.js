const joi = require('joi');

const tokenSchema = joi.string();
const firstnameSchema = joi.string().max(50);
const lastnameSchema = joi.string().max(50);
const emailSchema = joi.string().email();
const birthdateSchema = joi.string();
const ageSchema = joi.number().min(1);
const countrySchema = joi.string();
const phoneSchema = joi.string();
const avatarSchema = joi.string();
const postsSchema = joi.array().empty();

const createUserSchema = {
  firstname: firstnameSchema.required(),
  lastname: lastnameSchema.required(),
  email: emailSchema.required(),
  birthdate: birthdateSchema.required(),
  age: ageSchema.required(),
  country: countrySchema.required(),
  phone: phoneSchema.required(),
  avatar: avatarSchema.required(),
  posts: postsSchema.required(),
};

const updateUserSchema = {
  firstname: firstnameSchema,
  lastname: lastnameSchema,
  email: emailSchema,
  birthdate: birthdateSchema,
  age: ageSchema,
  country: countrySchema,
  phone: phoneSchema,
  avatar: avatarSchema,
  posts: postsSchema,
};

module.exports = { tokenSchema, createUserSchema, updateUserSchema };
