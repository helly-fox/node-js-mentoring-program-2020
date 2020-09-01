import Joi from 'joi';

const MAX_AGE = 130;
const MIN_AGE = 4;
const LOGIN_MIN_LENGTH = 3;

export const userSchema = Joi.object({
  login: Joi.string().min(LOGIN_MIN_LENGTH).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
});

export const idSchema = Joi.string().guid({ version: "uuidv4" });
