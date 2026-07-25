# Manas Advertising — Backend

## Setup
```bash
npm install
cp .env.example .env   # fill in real secrets
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed    # creates roles/permissions + super admin (admin@manasadvertising.com)
npm run dev
```

Docs: `GET /api-docs` (Swagger UI). Health check: `GET /health`.

## Notes
- `prisma generate` needs internet access to fetch the query engine binary; if you're behind a restrictive proxy, see Prisma's docs on `PRISMA_ENGINES_MIRROR`.
- Default super admin password is `ChangeMe123!` unless `SEED_ADMIN_PASSWORD` is set — change it immediately after first login.
