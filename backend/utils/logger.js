// backend/utils/logger.js

export function logInfo(event, requestId, data = {}) {
  console.log(JSON.stringify({
    level: "INFO",
    event,
    requestId,
    timestamp: new Date().toISOString(),
    ...data
  }));
}

export function logWarn(event, requestId, data = {}) {
  console.warn(JSON.stringify({
    level: "WARN",
    event,
    requestId,
    timestamp: new Date().toISOString(),
    ...data
  }));
}

export function logError(event, requestId, error, data = {}) {
  console.error(JSON.stringify({
    level: "ERROR",
    event,
    requestId,
    timestamp: new Date().toISOString(),
    message: error?.message || error,
    stack: error?.stack || null,
    ...data
  }));
}