import { Request, Response, NextFunction } from 'express';

const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, status, error } = err;
  const errorResponse = {
    error: error || 'undefine',
    message: message || 'error',
    status: status || '500',
    timestamp: new Date(),
  };

  return res.status(errorResponse.status).json(errorResponse);
};

export default errorHandler;
