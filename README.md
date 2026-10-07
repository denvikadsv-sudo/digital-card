# Цифровая визитка

GraphQL API обо мне: профиль, навыки, опыт и проекты.
NestJS (code-first GraphQL, Apollo Server) + Prisma + PostgreSQL + Docker.

Работает: <https://card.siftx.io/graphql>

## Запуск с нуля

```bash
docker compose up --build
```

При старте контейнер применяет миграции Prisma и заполняет базу (идемпотентно), затем запускает API.
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

Данные доступны на русском (по умолчанию) и английском: `profile(locale: EN) { ... }`.
Names of schema fields are English by design.

## Локальная разработка

```bash
cp .env.example .env        # DATABASE_URL должен указывать на работающий PostgreSQL
npm install
npm run bootstrap           # prisma migrate deploy && prisma db seed
npm run start:dev
```

## Структура

```
prisma/
  schema.prisma, migrations/   модель данных и SQL-миграции
  seed-data.ts                 мои данные на каждом языке (править здесь)
  seed.ts                      идемпотентное наполнение: upsert профиля, замена дочерних записей в транзакции
src/
  prisma/                      глобальный PrismaService
  profile/                     Query.profile и field-резолверы вложенных данных
  skills/ experience/ projects/   по модулю на сущность: GraphQL-модель + сервис (единственный слой, работающий с Prisma)
```

- В резолверах нет запросов к БД: они делегируют сервисам.
- `skills`, `experience`, `projects` — `@ResolveField`: в базу идёт запрос только если клиент их запросил.
- `endDate: null` означает текущее место работы.
- Локализация: `Profile` уникален по `(slug, locale)` и владеет своими навыками, опытом и проектами. Чтобы добавить язык, нужно значение в enum `Locale` и запись в `prisma/seed-data.ts`.
