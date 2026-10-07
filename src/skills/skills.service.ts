import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  findByProfile(profileId: number) {
    return this.prisma.skill.findMany({ where: { profileId }, orderBy: { id: 'asc' } });
  }
}
