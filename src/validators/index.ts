import Joi from 'joi';
import PERMISSIONS from '../constants';

const MAX_AGE = 130;
const MIN_AGE = 4;
const NAME_MIN_LENGTH = 3;
const LOGIN_MIN_LENGTH = 3;

export const userSchema = Joi.object({
  login: Joi.string().min(LOGIN_MIN_LENGTH).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
});

export const groupSchema = Joi.object({
  name: Joi.string().min(NAME_MIN_LENGTH).required(),
  permission: Joi.array().items(Joi.string().valid(...PERMISSIONS)).required(),
});

export const idSchema = Joi.string().guid({ version: "uuidv4" });
