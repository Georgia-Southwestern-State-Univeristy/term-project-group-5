import { logError } from '../../utils/logger.js';

export function globalErrorHandler(err, req, res, next) {
  logError("UNHANDLED_SERVER_ERROR", req.requestId, {
    endpoint: req.originalUrl,
    method: req.method,
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    message: "Internal server error"
  });
}