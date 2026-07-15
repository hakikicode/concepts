import { createServer } from 'node:http';
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { loadEnvironment } from '../src/config/environment.js';
import { createApp } from '../src/http/app.js';

const silentLogger = { info() {}, warn() {}, error() {} };
const environment = loadEnvironment({
  NODE_ENV: 'test',
  APP_NAME: 'SMARTOPENET AI',
  PORT: '3000',
  LOG_LEVEL: 'silent',
  CORS_ORIGINS: 'http://localhost:3000'
});

describe('SMARTOPENET AI API', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer(createApp(environment, silentLogger));
    await new Promise((resolve) => server.listen(0, resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });

  it('exposes a production health endpoint', async () => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'SMARTOPENET AI');
    assert.equal(body.environment, 'test');
    assert.equal(typeof body.timestamp, 'string');
  });

  it('publishes platform capability metadata', async () => {
    const response = await fetch(`${baseUrl}/api/v1/platform/capabilities`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(body.capabilities.includes('agentic-payments'));
    assert.ok(body.capabilities.includes('smart-node-network'));
  });
});
