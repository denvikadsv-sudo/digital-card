import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export const DEFAULT_PROFILE_SLUG = 'main';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMain() {
    const profile = await this.prisma.profile.findUnique({ where: { slug: DEFAULT_PROFILE_SLUG } });
    if (!profile) throw new NotFoundException('Profile is not seeded yet');
    return profile;
  }
}
