# Phase 0 — Production Foundation

## Goal

Establish the first commit-ready slice of SMARTOPENET AI: a secure Node.js API foundation that can host the AI Cloud, AI Assistant, AgentGrid Marketplace, SMART Node Network, marketplaces, payments, reputation, and rewards modules.

## Architecture

The platform starts as a modular monolith with clean boundaries. This keeps hackathon velocity high while preserving a direct path to independently deployable services when traffic and team size justify the split.

- `src/config`: validates environment variables at process startup.
- `src/http`: owns HTTP application composition, security headers, versioned API routes, and health checks.
- `src/shared`: cross-cutting infrastructure such as structured logging.
- `tests`: black-box API tests for externally observable behavior.

## Milestone Scope

This milestone intentionally ships only platform foundation features that are complete and verifiable:

1. Runtime configuration validation.
2. Security headers and CORS allow-listing.
3. Structured request logging with sensitive header redaction.
4. Production health endpoint.
5. Public platform capability metadata endpoint.
6. Syntax checks, linting, build, and API tests.

## Next Milestones

1. Authentication and organization tenancy with Clerk integration.
2. Prisma/PostgreSQL domain schema for users, organizations, projects, files, nodes, agents, and rewards.
3. AI Cloud file metadata service with repository and service layers.
4. OpenAI-backed assistant orchestration and tool registry.
5. AgentGrid provider registry, job model, and reputation primitives.
