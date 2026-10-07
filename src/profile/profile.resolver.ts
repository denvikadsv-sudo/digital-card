import { Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { ExperienceModel } from '../experience/experience.model';
import { ExperienceService } from '../experience/experience.service';
import { ProjectModel } from '../projects/project.model';
import { ProjectsService } from '../projects/projects.service';
import { SkillModel } from '../skills/skill.model';
import { SkillsService } from '../skills/skills.service';
import { ProfileModel } from './models/profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profiles: ProfileService,
    private readonly skillsService: SkillsService,
    private readonly experienceService: ExperienceService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Query(() => ProfileModel)
  profile() {
    return this.profiles.getMain();
  }

  @ResolveField('skills', () => [SkillModel])
  resolveSkills(@Parent() profile: ProfileModel) {
    return this.skillsService.findByProfile(profile.id);
  }

  @ResolveField('experience', () => [ExperienceModel])
  resolveExperience(@Parent() profile: ProfileModel) {
    return this.experienceService.findByProfile(profile.id);
  }

  @ResolveField('projects', () => [ProjectModel])
  resolveProjects(@Parent() profile: ProfileModel) {
    return this.projectsService.findByProfile(profile.id);
  }
}
