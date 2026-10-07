import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID) id: number;
  @Field() company: string;
  @Field() position: string;
  @Field(() => GraphQLISODateTime) startDate: Date;
  @Field(() => GraphQLISODateTime, { nullable: true, description: 'null means "present"' }) endDate?: Date | null;
  @Field(() => [String]) achievements: string[];
}
