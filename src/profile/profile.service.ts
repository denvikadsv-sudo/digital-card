import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Locale } from './locale.enum';

export const DEFAULT_PROFILE_SLUG = 'main';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMain(locale: Locale) {
    const profile = await this.prisma.profile.findUnique({
      where: { slug_locale: { slug: DEFAULT_PROFILE_SLUG, locale } },
    });
    if (!profile) throw new NotFoundException(`Профиль (${locale}) ещё не загружен в базу`);
    return profile;
  }
}
