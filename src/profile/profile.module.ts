import { Module } from '@nestjs/common';
import { ExperienceModule } from '../experience/experience.module';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [SkillsModule, ExperienceModule, ProjectsModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
