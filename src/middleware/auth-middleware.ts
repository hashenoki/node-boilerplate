import { Request, Response, NextFunction } from 'express';

import { AuthorizationError } from 'utils/custom-error';

export const onlyAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')?.replace('Bearer ', '')?.trim();

  if (!authHeader) {
    return next(new AuthorizationError('Unauthorized'));
  }

  try {
    res.header('Content-Type', 'application/json');

    return next();
  } catch (err) {
    return next(new AuthorizationError('Unauthorized'));
  }
};
