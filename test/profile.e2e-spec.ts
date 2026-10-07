import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

const profiles = {
  RU: { id: 1, name: 'Денис', title: 'Backend', description: 'ru', github: null, linkedin: null, telegram: null },
  EN: { id: 2, name: 'Denis', title: 'Backend', description: 'en', github: null, linkedin: null, telegram: null },
} as const;

const prismaFake = {
  profile: {
    findUnique: jest.fn(({ where }) => Promise.resolve(profiles[where.slug_locale.locale as 'RU' | 'EN'])),
  },
  skill: { findMany: jest.fn(({ where }) => Promise.resolve([{ id: 1, name: `skill-${where.profileId}`, category: 'Backend' }])) },
  experience: {
    findMany: jest.fn(() =>
      Promise.resolve([{ id: 1, company: 'SiftX', position: 'Founder', startDate: new Date('2026-07-22'), endDate: null, achievements: [] }]),
    ),
  },
  project: { findMany: jest.fn(() => Promise.resolve([{ id: 1, name: 'SiftX', url: 'https://siftx.io', description: 'd' }])) },
};

const TASK_QUERY = `query ($locale: Locale) {
  profile(locale: $locale) {
    name description skills { name } experience { company position } projects { name }
  }
}`;

describe('GraphQL profile (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prismaFake)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());

  const gql = (query: string, variables?: object) => request(app.getHttpServer()).post('/graphql').send({ query, variables });

  it('returns the nested profile from the task description', async () => {
    const res = await gql(TASK_QUERY).expect(200);

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.profile).toMatchObject({
      name: 'Денис',
      skills: [{ name: 'skill-1' }],
      experience: [{ company: 'SiftX', position: 'Founder' }],
      projects: [{ name: 'SiftX' }],
    });
  });

  it('serves the English profile when locale is EN', async () => {
    const res = await gql(TASK_QUERY, { locale: 'EN' }).expect(200);

    expect(res.body.data.profile.name).toBe('Denis');
    expect(res.body.data.profile.skills[0].name).toBe('skill-2');
  });

  it('does not query nested tables unless they are requested', async () => {
    prismaFake.skill.findMany.mockClear();
    await gql('{ profile { name } }').expect(200);

    expect(prismaFake.skill.findMany).not.toHaveBeenCalled();
  });

  it('rejects an unknown locale', async () => {
    const res = await gql('{ profile(locale: DE) { name } }');

    expect(res.body.errors).toBeDefined();
  });
});
