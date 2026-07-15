const severityRank = new Map([
  ['trace', 10],
  ['debug', 20],
  ['info', 30],
  ['warn', 40],
  ['error', 50],
  ['fatal', 60],
  ['silent', 100]
]);

function redact(value) {
  if (!value || typeof value !== 'object') return value;
  const clone = structuredClone(value);
  if (clone.req?.headers?.authorization) clone.req.headers.authorization = '[REDACTED]';
  if (clone.req?.headers?.cookie) clone.req.headers.cookie = '[REDACTED]';
  return clone;
}

export function createLogger(level = 'info') {
  const minimum = severityRank.get(level) ?? severityRank.get('info');

  function write(messageLevel, payload, message) {
    if ((severityRank.get(messageLevel) ?? 100) < minimum) return;
    const record = {
      level: messageLevel,
      time: new Date().toISOString(),
      service: 'smartopenet-api',
      message,
      ...(payload && typeof payload === 'object' ? redact(payload) : {})
    };
    const line = JSON.stringify(record);
    if (messageLevel === 'error' || messageLevel === 'fatal') console.error(line);
    else console.log(line);
  }

  return Object.freeze({
    info: (payload, message = 'info') => write('info', payload, message),
    warn: (payload, message = 'warn') => write('warn', payload, message),
    error: (payload, message = 'error') => write('error', payload, message)
  });
}
