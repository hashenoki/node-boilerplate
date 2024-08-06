import { DrizzleError } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';

import { NODE_ENV } from 'config';
import { ErrorType, reportCrash } from 'utils/crash-reporting';
import { CustomError } from 'utils/custom-error';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DrizzleError) {
    err = new CustomError(419, 'General', 'Database error', [], err);
  }

  if (err instanceof CustomError) {
    return res.status(err.HttpStatusCode || 500).json(err.JSON);
  }

  reportCrash('Internal server error.', err, ErrorType.HANDLED);

  const extendedError =
    NODE_ENV === 'development'
      ? {
          message: (err as Error).message,
          stack: (err as Error).stack,
        }
      : undefined;

  return res.status(500).json({
    type: 'General',
    error: 'Internal server error',
    ...extendedError,
  });
};
