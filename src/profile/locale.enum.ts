import { registerEnumType } from '@nestjs/graphql';
import { Locale } from '@prisma/client';

registerEnumType(Locale, { name: 'Locale', description: 'Language of the profile content' });

export { Locale };
