// TODO: add linkedin and telegram links if you want them shown.
export const profileSeed = {
  slug: 'main',
  name: 'Denis',
  title: 'Backend developer (TypeScript / Node.js)',
  description:
    'Founder and sole developer of SiftX, a real-time crypto and MOEX market screener. ' +
    'I build Node.js backends with WebSockets, Redis and PostgreSQL, and I develop with an AI agent (Claude Code) ' +
    'as a working tool: I define the architecture and requirements, review the result and operate it in production.',
  github: 'https://github.com/denvikadsv-sudo',
  linkedin: null as string | null,
  telegram: null as string | null,
};

export const skillsSeed = [
  { name: 'TypeScript', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'WebSocket', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Prisma', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Git', category: 'DevOps' },
  { name: 'PM2', category: 'DevOps' },
  { name: 'nginx', category: 'DevOps' },
  { name: 'Claude Code', category: 'Tooling' },
  { name: 'React', category: 'Frontend' },
];

export const experienceSeed = [
  {
    company: 'SiftX (own product)',
    position: 'Founder, full-stack developer',
    startDate: new Date('2026-07-22'),
    endDate: null as Date | null,
    achievements: [
      'Built a real-time screener over Binance, Bybit and Gate.io futures and spot markets plus 255 Russian stocks via the Tinkoff Invest API and MOEX ISS.',
      'Designed a multi-process backend: one market-data master and four WebSocket workers connected through Redis pub/sub, with a separate candle-cache process.',
      'Handled exchange limits in production: WebSocket stream sharding, order book snapshot rate limiting, and a Redis-backed candle cache with batched flushes.',
      'Shipped authentication and a crypto (USDT/TRC20) subscription with automatic on-chain payment verification.',
      'Deploy and operate the service on a VPS with PM2 and nginx, with a staging environment before production.',
    ],
  },
];

export const projectsSeed = [
  {
    name: 'SiftX',
    url: 'https://siftx.io',
    description: 'Real-time crypto and MOEX market screener with order book density map and trader journal.',
  },
  {
    name: 'Digital business card',
    url: 'https://github.com/denvikadsv-sudo/digital-card',
    description: 'This GraphQL API: NestJS, Prisma, PostgreSQL, Docker.',
  },
];
