# Manas Advertising — Backend Architecture (Milestone 1)

## 1. Technology Stack

| Concern | Choice | Why |
|---|---|---|
| Runtime | Node.js 20 LTS | Stable, long-term support, native fetch/test runner |
| Framework | Express 4 | Mature, minimal, huge middleware ecosystem, easy for another team to pick up |
| Language | TypeScript | Type safety across models/services/controllers, fewer runtime bugs |
| Database | PostgreSQL 16 | Relational integrity for CMS content, JSONB for flexible fields (SEO/homepage blocks), mature hosting support |
| ORM | Prisma | Type-safe queries, migrations, great DX, schema is a single source of truth |
| Auth | JWT (access + refresh) + bcrypt | Stateless auth scales horizontally; bcrypt for password hashing |
| Validation | Zod | Schema-first validation, reusable between DTOs and TypeScript types |
| File Upload | Multer + Sharp | Multer handles multipart uploads, Sharp handles image compression/resizing |
| Caching | Redis (ioredis) | Cache hot GET endpoints (services, homepage, settings); also used for rate limiting store |
| Logging | Winston + Morgan | Winston for structured app/error/audit logs, Morgan for HTTP access logs |
| Email | Nodemailer (SMTP, provider-agnostic) | Password reset, contact form notifications |
| Config | dotenv + Zod-validated env schema | Fail fast on missing/invalid config |
| Docs | Swagger (OpenAPI via swagger-jsdoc + swagger-ui-express) | Self-hosted, always in sync with route comments |
| Background Jobs | BullMQ + Redis | Email sending, image processing, future report generation |
| Deployment | Docker + Docker Compose, reverse-proxy ready (Nginx) | Portable, works on any VPS/cloud, easy CI/CD |
| Env Vars | `.env` + `.env.example`, validated at boot | Prevents misconfigured deploys |

## 2. Project Structure

```
src/
  controllers/     # HTTP layer — parse req, call service, shape response
  routes/           # Express routers, grouped per resource, versioned
  services/         # Business logic, orchestrates repositories
  repositories/      # Prisma queries only — no business logic
  middlewares/       # auth, rbac, errorHandler, rateLimiter, upload
  validators/         # Zod schemas per resource
  schemas/            # Prisma schema + generated types
  database/            # Prisma client singleton, seeders
  config/               # env loader, constants config
  utils/                # ApiResponse, ApiError, asyncHandler, pagination helpers
  storage/                # local disk adapter (swappable for S3 later)
  uploads/                 # runtime upload directory (gitignored)
  emails/                   # email templates + mailer service
  jobs/                      # BullMQ queues + workers
  constants/                  # roles, permissions, enums
  types/                       # shared TS types
  logs/                         # winston output (gitignored)
  scripts/                       # one-off scripts (seed, backup)
```

Each resource (e.g. `services`) follows: `route → controller → service → repository → Prisma`. This keeps HTTP, business logic, and data access independently testable and swappable.

## 3. Database Entities

Admin Users, Roles, Permissions, RolePermissions (join), Services, Categories, Portfolio, PortfolioImages, Testimonials, Clients, Gallery, FAQ, Blogs (future), HomepageContent, SiteSettings, ContactEnquiries, QuoteRequests, MediaFiles, ActivityLogs, SeoMetadata.

Normalization notes:
- `Portfolio` ↔ `Category` is many-to-one; `PortfolioImages` is one-to-many off `Portfolio`.
- `Roles` ↔ `Permissions` is many-to-many via `RolePermissions`.
- `MediaFiles` is a shared table referenced by polymorphic `entityType` + `entityId` (portfolio, gallery, testimonials, blogs) rather than duplicating upload logic per table.
- `SeoMetadata` is one-to-one with any content entity via `entityType` + `entityId`, avoiding SEO columns bloating every table.

## 4. Schema Conventions (applies to every table)

- `id` — UUID primary key
- Explicit foreign keys with `onDelete` policy per relationship (restrict for reference data, cascade for owned children like PortfolioImages)
- Indexes on all foreign keys + frequently filtered columns (`slug`, `status`, `categoryId`)
- Unique constraints on `email`, `slug` fields
- `createdAt` / `updatedAt` on every table
- `deletedAt` nullable column for soft delete (Prisma middleware auto-filters deleted rows)
- Designed to add `tenantId` later without restructuring (future multi-branch support)

## 5. API Architecture

Base path: `/api/v1/`

Resource groups: `auth`, `services`, `categories`, `portfolio`, `gallery`, `testimonials`, `clients`, `faq`, `contact`, `quotes`, `settings`, `media`, `dashboard`, (future) `blog`.

Standard REST verbs per resource (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`), with pagination/filtering/sorting query params on all list endpoints. Public read endpoints are separated from `/admin`-prefixed protected write endpoints so the frontend can hit public GETs without auth.

## 6. Validation Strategy

Centralized Zod schemas per resource in `validators/`, applied via a single `validate(schema)` middleware. Covers text (length/required), email, phone (regex + libphonenumber for format), URLs, numbers, booleans, dates (ISO), and file metadata (type/size) validated at the Multer layer before hitting disk.

## 7. File Storage

Local disk adapter behind a `StorageAdapter` interface (`storage/`), so swapping to S3/Cloudinary later is a one-file change. Uploaded files get UUID-based names, organized under `/uploads/{entityType}/{yyyy}/{mm}/`. Images are compressed and resized (thumbnail + full) via Sharp on upload.

## 8. Security Foundation

JWT access token (15 min) + refresh token (7 days, stored hashed in DB, rotated on use), bcrypt password hashing (cost 12), RBAC middleware checking role+permission per route, `express-rate-limit` (backed by Redis) on auth and public write endpoints, Helmet for security headers, strict CORS allow-list, `express-mongo-sanitize`-style input sanitization for XSS/injection, CSRF not required (stateless JWT + no cookie-based sessions for API), full audit logging of admin actions.

## 9. Error Handling

Central `errorHandler` middleware + `ApiError` class. Every response follows one envelope shape (see `utils/ApiResponse.ts`). All errors are logged via Winston with request context; 4xx get client-safe messages, 5xx get generic messages in production with full detail in logs.

## 10. Configuration

All secrets/config via `.env`, validated against a Zod schema at boot (`config/env.ts`) — the app refuses to start if required vars are missing. Separate config blocks for DB, Redis, JWT secrets, SMTP, storage, and CORS origins, structured so cloud provider swaps (e.g. RDS, managed Redis) only touch `.env`.

## 11. Logging Strategy

Winston with daily-rotate file transports: `logs/app.log`, `logs/error.log`, `logs/audit.log`, `logs/security.log` (failed logins, permission denials, rate-limit hits). Morgan pipes HTTP access logs into Winston. In production, console transport is disabled; file/JSON output is ready to ship to any log aggregator later.

## 12. Future-Ready Hooks

- Polymorphic `MediaFiles`/`SeoMetadata` tables already support blog/careers/awards/projects without schema changes.
- RBAC roles table is extensible (add roles without code changes).
- BullMQ job queue ready for notification jobs.
- i18n: content tables designed so translatable fields can move to a `Translations` side table later without breaking existing APIs.
- `entityType` polymorphism pattern reused for any future content type.

---

# BACKEND MILESTONE 1 SUMMARY

- Stack: Node.js 20 + TypeScript + Express + PostgreSQL + Prisma + Redis + BullMQ
- Auth: JWT access/refresh + bcrypt, RBAC via Roles/Permissions tables
- Folder structure: layered `route → controller → service → repository`, resource-based
- 19 core entities identified, fully normalized, polymorphic Media/SEO tables for reuse
- Every table: UUID PK, FKs with explicit indexes, soft delete, timestamps
- REST API planned under `/api/v1/`, public vs `/admin` write separation
- Validation centralized via Zod, one `validate()` middleware for all resources
- File storage behind swappable `StorageAdapter`, Sharp compression, UUID filenames
- Security: Helmet, CORS allow-list, rate limiting, input sanitization, audit logging
- Centralized error handling with consistent response envelope
- Logging: Winston (app/error/audit/security logs) + Morgan access logs
- Config validated at boot via Zod-checked env schema
- Future-ready: polymorphic content tables, extensible RBAC, job queue, i18n path
- **Milestone 2 will implement:** actual Prisma schema + migrations, Express app skeleton, JWT auth flow (login/refresh/forgot-reset password), RBAC middleware, CRUD APIs for all content resources with pagination/filter/search/sort, upload system, centralized validation/error/response utilities, and Swagger documentation.
