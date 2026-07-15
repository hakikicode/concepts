const capabilities = Object.freeze([
  'ai-cloud',
  'ai-assistant',
  'agentgrid-marketplace',
  'smart-node-network',
  'compute-marketplace',
  'storage-marketplace',
  'network-marketplace',
  'agentic-payments',
  'reputation-engine',
  'smart-rewards'
]);

function sendJson(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'no-referrer',
    ...headers
  });
  response.end(JSON.stringify(body));
}

export function createApp(environment, logger) {
  return async function app(request, response) {
    const startedAt = performance.now();
    const origin = request.headers.origin;
    const corsHeaders = origin && environment.corsOrigins.includes(origin)
      ? { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true' }
      : {};

    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {}, { ...corsHeaders, 'access-control-allow-methods': 'GET,OPTIONS' });
      return;
    }

    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, {
        status: 'ok',
        service: environment.appName,
        environment: environment.nodeEnv,
        timestamp: new Date().toISOString()
      }, corsHeaders);
    } else if (request.method === 'GET' && request.url === '/api/v1/platform/capabilities') {
      sendJson(response, 200, {
        product: 'SMARTOPENET AI',
        tagline: 'The Decentralized AI Operating System.',
        capabilities
      }, corsHeaders);
    } else {
      sendJson(response, 404, { error: 'not_found', message: 'Route not found' }, corsHeaders);
    }

    logger.info({
      req: { method: request.method, url: request.url, headers: request.headers },
      res: { statusCode: response.statusCode },
      durationMs: Math.round(performance.now() - startedAt)
    }, 'http_request_completed');
  };
}
