/**
 * Logger Utility
 * Provides methods for logging info, warnings, and errors
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

const formatLog = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    console.log(logMessage, data);
  } else {
    console.log(logMessage);
  }
};

const logger = {
  info: (message, data = null) => {
    formatLog(LOG_LEVELS.INFO, message, data);
  },
  
  warn: (message, data = null) => {
    formatLog(LOG_LEVELS.WARN, message, data);
  },
  
  error: (message, data = null) => {
    formatLog(LOG_LEVELS.ERROR, message, data);
  },
};

export default logger;
