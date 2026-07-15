# SMARTOPENET AI

**The Decentralized AI Operating System.**

SMARTOPENET AI is an AI-native SaaS platform where humans and AI agents collaborate, purchase infrastructure, execute intelligent workflows, and earn rewards through decentralized compute, storage, networking, and agentic payments.

## Current Milestone

Phase 0 establishes the production API foundation. See [`docs/architecture/phase-0-foundation.md`](docs/architecture/phase-0-foundation.md).

## Quick Start

```bash
npm install
npm run build
npm test
npm run dev
```

The API exposes:

- `GET /health` — operational health check.
- `GET /api/v1/platform/capabilities` — product capability metadata.

## Engineering Standards

- Native Node.js HTTP foundation with zero runtime package risk in the current restricted registry environment.
- Security response headers and CORS allow-listing.
- Runtime environment validation.
- Structured JSON logging with sensitive header redaction.
- Node.js built-in test runner API coverage.
- Repository lint guardrails for import and logging conventions.


## Vercel Deployment

This repository is ready to import into Vercel. The `vercel.json` route configuration sends all HTTP traffic to `api/index.js`, which reuses the same production application factory as local development.

Required environment variables can be configured in Vercel Project Settings:

- `NODE_ENV=production`
- `APP_NAME=SMARTOPENET AI`
- `LOG_LEVEL=info`
- `CORS_ORIGINS=https://your-production-domain.example`
