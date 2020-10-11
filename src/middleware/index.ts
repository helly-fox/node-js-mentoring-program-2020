import { STATUS } from 'src/constants';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

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

const hidePassword = (body: { password?: string }) => {
  return { ...body, ...(body.password && { password: '***' }) };
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const queryString = JSON.stringify(req.query);
  const bodyString = JSON.stringify(hidePassword(req.body));

  logger.info(
    `${req.method} ${req.originalUrl}${queryString ? `\n\tREQUEST QUERY PARAMS: ${queryString}` : ''}${
      bodyString ? `\n\tREQUEST BODY: ${bodyString}` : ''
    }`
  );
  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const queryString = JSON.stringify(req.query);
  const bodyString = JSON.stringify(hidePassword(req.body));

  logger.error(
    `${req.method} ${req.originalUrl}${queryString ? `\n\tREQUEST QUERY PARAMS: ${queryString}` : ''}${
      bodyString ? `\n\tREQUEST BODY: ${bodyString}` : ''
    }\n\tError: ${err}`
  );
  res.status(STATUS.INTERNAL_SERVER_ERROR).send(err.message);
};

export const trackExecutionTime = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl} request duration: ${Date.now() - start}`);
  });
  next();
};
