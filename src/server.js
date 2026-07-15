import { createServer } from 'node:http';
import { env } from './config/environment.js';
import { createApp } from './http/app.js';
import { createLogger } from './shared/logger.js';

const logger = createLogger(env.logLevel);
const server = createServer(createApp(env, logger));

server.listen(env.port, () => {
  logger.info({ port: env.port }, 'SMARTOPENET AI API listening');
});

process.on('SIGTERM', () => {
  logger.info({}, 'SIGTERM received; shutting down gracefully');
  server.close(() => process.exit(0));
});
