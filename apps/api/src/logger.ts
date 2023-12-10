import morgan from "morgan";
import winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;

const logLevels = {
  alert: 0, // Action must be taken immediately
  crit: 1, // Critical conditions
  error: 2, // Internal server errors
  warning: 3, // E.g. API on unauthorized access
  notice: 4, // Subtle informations
  info: 5, // Generic information
  http: 6, // HTTP requests
  debug: 7, // Debug messages
};

export const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export const loggingMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);
