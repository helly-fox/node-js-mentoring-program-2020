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

export const validationUserIdsSchema = (schema: Joi.AnySchema) => (req: Request, res: Response, next: NextFunction) => {
  const ids = req.body.userIds;

  const errors = ids
    .map((id: string) => {
      const { error } = schema.validate(id, {
        abortEarly: false,
        allowUnknown: false,
      });

      return error?.details;
    })
    .filter(Boolean);

  if (errors.length) {
    res.status(STATUS.INVALID).json(errors.details);
  } else {
    next();
  }
};
