const allowedEnvironments = new Set(['development', 'test', 'production']);
const allowedLogLevels = new Set(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']);

function readString(source, key, fallback) {
  const value = source[key] ?? fallback;
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${key} must be a non-empty string`);
  }
  return value.trim();
}

function readEnum(source, key, fallback, allowed) {
  const value = readString(source, key, fallback);
  if (!allowed.has(value)) {
    throw new Error(`${key} must be one of: ${Array.from(allowed).join(', ')}`);
  }
  return value;
}

function readPort(source) {
  const rawValue = source.PORT ?? '3000';
  const port = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

export function loadEnvironment(source = process.env) {
  const corsOrigins = readString(source, 'CORS_ORIGINS', 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (corsOrigins.length === 0) {
    throw new Error('CORS_ORIGINS must contain at least one origin');
  }

  return Object.freeze({
    nodeEnv: readEnum(source, 'NODE_ENV', 'development', allowedEnvironments),
    port: readPort(source),
    appName: readString(source, 'APP_NAME', 'SMARTOPENET AI'),
    logLevel: readEnum(source, 'LOG_LEVEL', 'info', allowedLogLevels),
    corsOrigins
  });
}

export const env = loadEnvironment();
