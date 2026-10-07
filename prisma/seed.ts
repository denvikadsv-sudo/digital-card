import { Locale, PrismaClient } from '@prisma/client';
import { seedByLocale } from './seed-data';

const prisma = new PrismaClient();
const SLUG = 'main';

// Idempotent: each locale's profile is upserted, its children are replaced in one transaction.
async function seedLocale(locale: Locale) {
  const data = seedByLocale[locale];
  await prisma.$transaction(async (tx) => {
    const profile = await tx.profile.upsert({
      where: { slug_locale: { slug: SLUG, locale } },
      create: { slug: SLUG, locale, ...data.profile },
      update: data.profile,
    });
    const profileId = profile.id;

    await tx.skill.deleteMany({ where: { profileId } });
    await tx.experience.deleteMany({ where: { profileId } });
    await tx.project.deleteMany({ where: { profileId } });

    await tx.skill.createMany({ data: data.skills.map((s) => ({ ...s, profileId })) });
    await tx.experience.createMany({ data: data.experience.map((e) => ({ ...e, profileId })) });
    await tx.project.createMany({ data: data.projects.map((p) => ({ ...p, profileId })) });
  });
}

async function main() {
  for (const locale of Object.values(Locale)) {
    await seedLocale(locale);
  }
  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
