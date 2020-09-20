import { STATUS } from 'src/constants';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validationBodySchema = (schema: Joi.AnySchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error && error.isJoi) {
    res.status(STATUS.INVALID).json(error.details);
  } else {
    next();
  }
};

export const validationIdSchema = (schema: Joi.AnySchema, prop: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params[prop];

  const { error } = schema.validate(id, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error && error.isJoi) {
    res.status(STATUS.INVALID).json(error.details);
  } else {
    next();
  }
};
