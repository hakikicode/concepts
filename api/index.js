import { env } from '../src/config/environment.js';
import { createApp } from '../src/http/app.js';
import { createLogger } from '../src/shared/logger.js';

const logger = createLogger(env.logLevel);

export default createApp(env, logger);
