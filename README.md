# prisma-worker-crash-reproduction

A simple reproduction for the following issues:

- https://github.com/prisma/prisma/issues/18577
- https://github.com/vitest-dev/vitest/issues/3106

## Reproduction Steps

1. Clone repository
2. Install dependencies with `npm ci`
3. Run `docker compose up -d` to start Postgres
4. Run `npx prisma migrate dev` to initialize the database.
5. Run `npm start` to run the `index.mjs` file. ENVs `RUST_BACKTRACE=full` and `DEBUG='*'` are added for convenience.
