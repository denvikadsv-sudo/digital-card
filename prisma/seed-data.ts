import { Locale } from '@prisma/client';

const GITHUB = 'https://github.com/denvikadsv-sudo';
const TELEGRAM = 'https://t.me/denis_igish';

const skillNames: Record<string, string[]> = {
  language: ['TypeScript', 'JavaScript'],
  backend: ['Node.js', 'NestJS', 'GraphQL', 'WebSocket'],
  database: ['PostgreSQL', 'Prisma', 'Redis', 'SQLite'],
  devops: ['Docker', 'Git', 'PM2', 'nginx'],
  tooling: ['Claude Code'],
  frontend: ['React'],
};

const categoryLabels: Record<Locale, Record<string, string>> = {
  EN: { language: 'Language', backend: 'Backend', database: 'Database', devops: 'DevOps', tooling: 'Tooling', frontend: 'Frontend' },
  RU: { language: 'Язык', backend: 'Бэкенд', database: 'Базы данных', devops: 'DevOps', tooling: 'Инструменты', frontend: 'Фронтенд' },
};

const skillsFor = (locale: Locale) =>
  Object.entries(skillNames).flatMap(([category, names]) =>
    names.map((name) => ({ name, category: categoryLabels[locale][category] })),
  );

const SIFTX_START = new Date('2026-07-22');

export const seedByLocale: Record<
  Locale,
  {
    profile: { name: string; title: string; description: string; github: string; linkedin: string | null; telegram: string };
    skills: { name: string; category: string }[];
    experience: { company: string; position: string; startDate: Date; endDate: Date | null; achievements: string[] }[];
    projects: { name: string; url: string; description: string }[];
  }
> = {
  EN: {
    profile: {
      name: 'Denis',
      title: 'Backend developer (TypeScript / Node.js)',
      description:
        'Founder and sole developer of SiftX, a real-time crypto and MOEX market screener. ' +
        'I build Node.js backends with WebSockets, Redis and PostgreSQL, and I develop with an AI agent (Claude Code) ' +
        'as a working tool: I define the architecture and requirements, review the result and operate it in production.',
      github: GITHUB,
      linkedin: null,
      telegram: TELEGRAM,
    },
    skills: skillsFor('EN'),
    experience: [
      {
        company: 'SiftX (own product)',
        position: 'Founder, full-stack developer',
        startDate: SIFTX_START,
        endDate: null,
        achievements: [
          'Built a real-time screener over Binance, Bybit and Gate.io futures and spot markets plus 255 Russian stocks via the Tinkoff Invest API and MOEX ISS.',
          'Designed a multi-process backend: one market-data master and four WebSocket workers connected through Redis pub/sub, with a separate candle-cache process.',
          'Handled exchange limits in production: WebSocket stream sharding, order book snapshot rate limiting, and a Redis-backed candle cache with batched flushes.',
          'Shipped authentication and a crypto (USDT/TRC20) subscription with automatic on-chain payment verification.',
          'Deploy and operate the service on a VPS with PM2 and nginx, with a staging environment before production.',
        ],
      },
    ],
    projects: [
      {
        name: 'SiftX',
        url: 'https://siftx.io',
        description: 'Real-time crypto and MOEX market screener with order book density map and trader journal.',
      },
      {
        name: 'Digital business card (test assignment)',
        url: `${GITHUB}/digital-card`,
        description: 'The GraphQL API you are querying right now: NestJS, Prisma, PostgreSQL, Docker. Built as a test assignment together with Claude Code.',
      },
    ],
  },
  RU: {
    profile: {
      name: 'Денис',
      title: 'Backend-разработчик (TypeScript / Node.js)',
      description:
        'Основатель и единственный разработчик SiftX, скринера крипто- и московского рынка в реальном времени. ' +
        'Пишу Node.js-бэкенды с WebSocket, Redis и PostgreSQL. Работаю с ИИ-агентом (Claude Code) как с инструментом: ' +
        'сам задаю архитектуру и требования, проверяю результат и эксплуатирую сервис в продакшене.',
      github: GITHUB,
      linkedin: null,
      telegram: TELEGRAM,
    },
    skills: skillsFor('RU'),
    experience: [
      {
        company: 'SiftX (собственный продукт)',
        position: 'Основатель, full-stack разработчик',
        startDate: SIFTX_START,
        endDate: null,
        achievements: [
          'Сделал скринер в реальном времени по фьючерсам и споту Binance, Bybit и Gate.io, а также по 255 российским акциям через Tinkoff Invest API и MOEX ISS.',
          'Спроектировал многопроцессный бэкенд: один мастер рыночных данных и четыре WebSocket-воркера, связанные через Redis pub/sub, плюс отдельный процесс кэша свечей.',
          'Учёл лимиты бирж в продакшене: шардирование WebSocket-потоков, ограничение частоты снимков стакана, кэш свечей в Redis с пакетной записью.',
          'Реализовал авторизацию и крипто-подписку (USDT/TRC20) с автоматической проверкой платежей в блокчейне.',
          'Развёртываю и эксплуатирую сервис на VPS (PM2, nginx), перед продакшеном выкатываю на staging.',
        ],
      },
    ],
    projects: [
      {
        name: 'SiftX',
        url: 'https://siftx.io',
        description: 'Скринер крипто- и московского рынка в реальном времени с картой плотностей стакана и дневником трейдера.',
      },
      {
        name: 'Цифровая визитка (тестовое задание)',
        url: `${GITHUB}/digital-card`,
        description: 'GraphQL API, который вы сейчас запрашиваете: NestJS, Prisma, PostgreSQL, Docker. Сделан как тестовое задание вместе с Claude Code.',
      },
    ],
  },
};
