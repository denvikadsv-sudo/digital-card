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
Названия полей схемы английские: так требует задание.

## Тесты

```bash
npm test
```

- Unit-тесты: `ProfileService` (поиск по slug и locale, ошибка при пустой базе) и валидация переменных окружения.
- e2e-тест (`test/profile.e2e-spec.ts`): настоящий GraphQL-модуль с подменённым `PrismaService`, поэтому база не нужна. Проверяет запрос из задания, смену языка, ленивую загрузку вложенных полей и отказ на неизвестный `locale`.
- GitHub Actions (`.github/workflows/ci.yml`) на каждый push собирает проект и запускает тесты.

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

## Принятые решения

- **NestJS + code-first GraphQL.** Схема строится из TypeScript-классов, поэтому модель и схема не расходятся.
- **Prisma + PostgreSQL.** Типобезопасные запросы и SQL-миграции в репозитории. `npm run bootstrap` (миграции и идемпотентный сид) запускается в контейнере перед стартом, поэтому `docker compose up` работает на пустой машине.
- **Сервисы - единственный слой с доступом к БД.** Резолверы только принимают запрос и делегируют, это упрощает тестирование.
- **Отдельные записи на каждый язык** вместо JSON-переводов: обычные таблицы и обычные запросы, язык добавляется строкой в сиде.
- **Проверка окружения при старте** (`src/config/env.validation.ts`): без корректного `DATABASE_URL` приложение сразу падает с понятным сообщением.
- **Известное ограничение.** Каждое вложенное поле - один отдельный запрос к БД. Для одного профиля это три запроса максимум. Если профилей станет много, нужен DataLoader для пакетной загрузки (проблема N+1); сейчас он усложнил бы код без пользы.
