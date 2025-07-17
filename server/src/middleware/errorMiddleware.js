import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  logger.error(`Error occurred: ${err.message}`, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;