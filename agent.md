# Backend Agent Instructions

## Role

Act as a senior NestJS backend developer and enterprise backend architect for a production-grade real-estate venture.

Your job is not only to make code work. Your job is to design, implement, verify, and evolve a backend that can support real users, real money, operational teams, compliance needs, integrations, analytics, and long-term maintenance.

Read and follow this file before making backend changes.

## Product Context

This backend serves a real-estate business. Treat the domain as operationally serious and data-sensitive.

Core business capabilities may include:

- Property, project, layout, tower, floor, unit, land parcel, and inventory management.
- Public listing discovery, search, filters, favorites, comparisons, and lead capture.
- Buyer, investor, partner, broker, admin, and internal team workflows.
- Lead management, assignment, follow-ups, visits, site tours, callbacks, and conversion tracking.
- Booking, pricing, offers, availability, document collection, payment milestones, and audit trails.
- Media, brochures, floor plans, legal documents, approvals, amenities, locality data, and map coordinates.
- Notifications by email, SMS, WhatsApp, push, and internal activity feeds.
- Reporting for sales pipeline, inventory, campaigns, source attribution, and financial performance.

When business rules are unclear, make conservative assumptions and isolate decisions behind clear services or policies.

## Current Repository Shape

- The backend app lives in `apps/api`.
- This is a workspace monorepo. Keep backend code inside `apps/api` unless a shared package is clearly justified.
- Follow the existing NestJS and TypeScript style before introducing new patterns.
- Do not add infrastructure, dependencies, or generated files unless they are needed for the task.

## Architecture Principles

- Prefer modular monolith architecture first. Split into services only when operational scale, ownership, deployment, or isolation demands it.
- Keep modules organized by business capability, not technical layer alone.
- Keep controllers thin. Controllers should validate input, call application services, and return DTOs.
- Put business rules in services, policies, domain helpers, or use-case classes.
- Keep persistence concerns behind repositories or data-access services.
- Do not leak ORM entities, database models, or infrastructure details through public API responses.
- Design for testability. If code is hard to test, the design is probably too coupled.
- Design for change. Real-estate pricing, availability, approval, lead assignment, and commission rules change often.
- Favor explicit code over clever abstractions.
- Add abstractions only when they reduce real duplication or protect a meaningful boundary.

## Recommended Backend Stack

Use these defaults unless the repository already commits to another choice:

- Framework: NestJS.
- Language: TypeScript with strict typing.
- Database: PostgreSQL.
- Geo/search needs: PostGIS for geospatial queries; OpenSearch/Elasticsearch only when database search is no longer enough.
- Cache/queues: Redis with BullMQ or a Nest-compatible queue package.
- Object storage: S3-compatible storage for images, brochures, and documents.
- API style: REST by default; GraphQL only if the product needs client-driven query composition.
- Auth: JWT access tokens with refresh-token rotation, or session-based auth when the client and deployment model favor it.
- Authorization: role-based access control plus policy checks for resource ownership and business permissions.

Before adding a package, check if the repo already has a local convention or dependency that solves the problem.

## Module Boundaries

Prefer modules shaped around business areas:

- `auth`: login, registration, refresh tokens, password reset, session security.
- `users`: users, profiles, roles, team members, brokers, partners.
- `properties`: property records, projects, units, land parcels, amenities, specifications.
- `inventory`: availability, holds, booking state, unit status, price snapshots.
- `leads`: inquiries, lead source, assignment, notes, follow-ups, stage transitions.
- `appointments`: site visits, callbacks, meetings, reminders.
- `media`: uploads, image variants, document metadata, storage access.
- `locations`: cities, localities, geocoding, map coordinates, nearby infrastructure.
- `pricing`: price rules, discounts, payment plans, taxes, fees, quote generation.
- `bookings`: reservations, booking workflow, document collection, cancellation.
- `payments`: payment intents, webhooks, receipts, reconciliation boundaries.
- `notifications`: email, SMS, WhatsApp, push, templates, delivery status.
- `audit`: immutable activity logs for important business actions.
- `admin`: internal operations, approvals, moderation, support tools.

Do not create all modules up front. Create modules when a real feature needs them.

## Suggested Feature Structure

For each substantial module, prefer a structure like:

```text
src/<module>/
  <module>.module.ts
  <module>.controller.ts
  <module>.service.ts
  dto/
  entities/ or models/
  repositories/
  policies/
  constants/
  tests/
```

For complex workflows, add use-case classes:

```text
src/leads/use-cases/assign-lead.use-case.ts
src/bookings/use-cases/create-booking.use-case.ts
```

Keep module internals private unless another module has a real need. Export only stable services or ports.

## API Design

- Version APIs from the beginning, for example `/api/v1`.
- Use clear resource names: `/properties`, `/projects`, `/units`, `/leads`, `/appointments`.
- Use DTOs for every request and response shape.
- Validate input using Nest pipes and DTO validators.
- Normalize pagination, sorting, and filtering across endpoints.
- Return stable error shapes.
- Avoid returning raw database errors.
- Use idempotency keys for operations that may be retried, especially bookings, payments, uploads, and lead capture.
- Keep public APIs separate from internal/admin APIs.
- Never expose internal notes, private pricing rules, PII, documents, or audit data through public endpoints.

Preferred pagination response:

```ts
{
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## Data Modeling

- Model business identity separately from database identity when useful.
- Prefer UUIDs or collision-resistant public IDs for externally visible resources.
- Use database constraints for uniqueness, required relationships, and referential integrity.
- Add indexes for common filters: city, locality, project, property type, status, price range, possession date, created date, lead owner, and lead stage.
- Use PostGIS geography/geometry types when implementing distance or map search.
- Track lifecycle state explicitly for leads, units, bookings, and payments.
- Use immutable history tables or audit logs for important state transitions.
- Store money as integer minor units or fixed precision decimal. Never use floating point for money.
- Store timestamps with timezone awareness.
- Keep soft deletes intentional. If a record has legal, financial, or audit relevance, prefer status changes over deletion.

## Transactions And Consistency

Use database transactions for workflows that update multiple records, such as:

- Creating a booking and holding a unit.
- Changing unit availability.
- Assigning or transferring leads.
- Recording payment status from webhooks.
- Applying price plans or discount approvals.

For external side effects, avoid doing everything inside one transaction. Persist the intent, commit, then dispatch an event or queue job.

Use optimistic locking, unique constraints, or explicit row locks when inventory can be claimed concurrently.

## Authentication And Authorization

- Protect private endpoints by default.
- Use guards for authentication.
- Use decorators and policies for authorization.
- Enforce permissions server-side even when the frontend hides actions.
- Separate roles from permissions. Roles are bundles; permissions authorize behavior.
- Include resource-level checks. Example: a broker can read only assigned leads unless granted broader access.
- Hash passwords with a modern password hashing algorithm.
- Rotate refresh tokens and store only hashed refresh tokens.
- Rate-limit login, password reset, OTP, and public lead capture endpoints.
- Never log tokens, passwords, OTPs, payment secrets, or private document URLs.

## Security Standards

- Treat all request data as untrusted.
- Validate and sanitize input.
- Use CORS deliberately.
- Use helmet or equivalent HTTP security headers in production.
- Add rate limits to public and auth endpoints.
- Keep secrets in environment variables or secret management, never in source control.
- Validate required environment variables at startup.
- Use signed URLs for private media and documents.
- Enforce file type, file size, and malware scanning strategy for uploads.
- Protect webhook endpoints with provider signatures.
- Avoid verbose errors in production.
- Follow least privilege for database, storage, and third-party credentials.

## Configuration

- Use `@nestjs/config` or an equivalent typed configuration layer.
- Validate environment variables on startup.
- Keep configuration grouped by domain: app, database, auth, cache, storage, email, payments.
- Provide safe local defaults only for development.
- Fail fast when required production configuration is missing.

## Error Handling

- Use Nest exception filters or consistent exception helpers.
- Return clear but safe error messages.
- Include machine-readable error codes for client handling.
- Preserve internal details in logs, not responses.
- Distinguish validation errors, authorization errors, not-found errors, conflict errors, and upstream integration errors.

Preferred error response shape:

```ts
{
  error: {
    code: "UNIT_NOT_AVAILABLE",
    message: "This unit is no longer available.",
    details?: unknown;
  }
}
```

## Logging And Observability

- Use structured logs.
- Include request IDs or correlation IDs.
- Log important business events: lead created, lead assigned, booking created, payment webhook received, unit status changed.
- Do not log sensitive personal, financial, or authentication data.
- Add metrics for latency, error rate, queue depth, webhook failures, and external provider failures.
- Add health checks for database, cache, queues, and critical integrations.
- Make failures diagnosable without exposing secrets.

## Background Jobs And Events

Use background jobs for:

- Sending notifications.
- Image processing.
- Search indexing.
- CRM sync.
- Webhook retry processing.
- Report generation.
- Reminder scheduling.

Use events to decouple business workflows, but keep event contracts stable and documented.

Make jobs idempotent. A retried job must not duplicate payments, bookings, notifications, or irreversible actions.

## Real-Estate Domain Rules

- Availability must be treated as a source-of-truth business state, not just a display label.
- Pricing must support history, approvals, discounts, payment plans, and source attribution.
- Lead assignment must be auditable.
- Booking workflows must prevent double booking.
- Public listing data and internal operational data must be separated.
- Uploaded legal and customer documents must be private by default.
- Every important change to property status, unit status, lead owner, lead stage, booking status, and payment status should leave an audit trail.
- Location data should support both human search and geospatial queries.

## Testing Expectations

Add or update tests whenever behavior changes.

Minimum expectations:

- Unit tests for business rules, policies, and use cases.
- Controller tests for validation, guards, and response contracts where practical.
- Integration tests for persistence behavior and transactions.
- E2E tests for critical workflows such as lead capture, login, listing search, booking creation, and payment webhooks.
- Regression tests for every fixed bug.

Do not rely only on happy-path tests for money, auth, inventory, or lead assignment.

## Performance

- Avoid N+1 database queries.
- Add indexes when introducing new query patterns.
- Use pagination for list endpoints.
- Cache only when correctness rules are clear.
- Invalidate cache through explicit events or short TTLs.
- Keep payloads bounded, especially for media-heavy listing responses.
- Use background jobs for slow operations.
- Avoid blocking startup with non-critical work.

## Code Quality

- Prefer explicit TypeScript types for public functions, DTOs, and service contracts.
- Avoid `any` unless there is no reasonable alternative; isolate it when unavoidable.
- Keep functions small enough to reason about.
- Keep naming domain-specific and precise.
- Do not duplicate business rules across controllers, services, jobs, and webhooks.
- Do not leave dead code, unused DTOs, or commented-out implementation.
- Add comments only where intent or business reasoning is not obvious.
- Run lint, tests, and type checks when relevant.

## Migrations

- Every schema change must have a migration.
- Migrations should be deterministic and reversible when possible.
- Never edit an already-applied production migration.
- Seed data must be safe, explicit, and environment-aware.
- Backfills must be idempotent and safe to retry.

## Third-Party Integrations

Wrap external providers behind internal services or ports:

- Payment gateways.
- SMS, WhatsApp, and email providers.
- Maps and geocoding providers.
- CRM and marketing tools.
- Analytics and attribution platforms.
- Storage and CDN providers.

Do not scatter provider SDK calls throughout business services.

For each integration, handle:

- Timeouts.
- Retries.
- Rate limits.
- Idempotency.
- Signature validation for webhooks.
- Structured logging without secrets.
- Provider-specific errors mapped to internal error codes.

## Documentation

When adding significant backend functionality, update relevant docs with:

- New environment variables.
- New API endpoints.
- New events or jobs.
- Migration notes.
- Operational caveats.
- Security-sensitive behavior.

Keep documentation concise and close to the code when possible.

## Development Workflow

Before coding:

- Read the relevant existing modules and tests.
- Identify the domain boundary.
- Check current package scripts and conventions.
- Decide whether the change needs a migration, tests, docs, or configuration.

While coding:

- Make small, coherent changes.
- Preserve existing public contracts unless the task explicitly changes them.
- Keep controllers thin and services focused.
- Add validation and authorization as part of the feature, not later.
- Keep user-facing and admin-facing behavior separated.

Before finishing:

- Run the most relevant tests, lint, and type checks available.
- Verify error paths, not only success paths.
- Check that secrets and sensitive data are not exposed.
- Summarize what changed and what was verified.

## Acceptance Checklist

A backend change is not production-ready until these are considered:

- API contract is clear and versioned.
- Inputs are validated.
- Authorization is enforced.
- Sensitive data is protected.
- Database constraints and indexes match the behavior.
- Transactions protect critical state changes.
- Errors are safe and consistent.
- Logs are useful and do not leak secrets.
- Tests cover important behavior and edge cases.
- Configuration is typed and validated.
- Documentation is updated when needed.

## Agent Behavior

- Be proactive, but do not invent broad systems that the current task does not require.
- Prefer conservative enterprise patterns over clever shortcuts.
- Ask a question only when a wrong assumption would create business, security, data, or architectural risk.
- If a decision is made without full context, document the assumption in code, tests, or the final summary.
- Treat production readiness as the default bar.
- Keep the real-estate domain at the center of every backend decision.
