# Digital business card

GraphQL API about me: profile, skills, experience and projects.
NestJS (code-first GraphQL, Apollo Server) + Prisma + PostgreSQL + Docker.

## Run from scratch

```bash
docker compose up --build
```

On start the container applies Prisma migrations and seeds the database (idempotent), then starts the API.
Apollo Sandbox: <http://localhost:3000/graphql>

```graphql
query {
  profile {
    name
    description
    skills { name category }
    experience { company position startDate endDate achievements }
    projects { name url }
  }
}
```

## Local development

```bash
cp .env.example .env        # DATABASE_URL must point to a running PostgreSQL
npm install
npm run bootstrap           # prisma migrate deploy && prisma db seed
npm run start:dev
```

## Structure

```
prisma/
  schema.prisma, migrations/   data model and SQL migrations
  seed-data.ts                 my data (edit this file)
  seed.ts                      idempotent seeding: upsert profile, replace children in a transaction
src/
  prisma/                      global PrismaService
  profile/                     Query.profile and field resolvers for nested data
  skills/ experience/ projects/   one module per entity: GraphQL model + service (the only layer that talks to Prisma)
```

- Resolvers contain no queries: they delegate to services.
- `skills`, `experience` and `projects` are `@ResolveField`s: they hit the database only when the client selects them.
- `endDate: null` means the position is current.
