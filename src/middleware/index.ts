import STATUS from 'src/constants';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const validationSchema = (schema: Joi.AnySchema) => (req: Request, res: Response, next: NextFunction) => {
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

export default validationSchema;
