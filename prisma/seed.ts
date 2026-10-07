import { PrismaClient } from '@prisma/client';
import { experienceSeed, profileSeed, projectsSeed, skillsSeed } from './seed-data';

const prisma = new PrismaClient();

// Idempotent: the profile is upserted by slug, its children are replaced in one transaction.
async function main() {
  await prisma.$transaction(async (tx) => {
    const profile = await tx.profile.upsert({
      where: { slug: profileSeed.slug },
      create: profileSeed,
      update: profileSeed,
    });
    const profileId = profile.id;

    await tx.skill.deleteMany({ where: { profileId } });
    await tx.experience.deleteMany({ where: { profileId } });
    await tx.project.deleteMany({ where: { profileId } });

    await tx.skill.createMany({ data: skillsSeed.map((s) => ({ ...s, profileId })) });
    await tx.experience.createMany({ data: experienceSeed.map((e) => ({ ...e, profileId })) });
    await tx.project.createMany({ data: projectsSeed.map((p) => ({ ...p, profileId })) });
  });
  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
