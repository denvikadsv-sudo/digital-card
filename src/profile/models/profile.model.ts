import { Field, ID, ObjectType } from '@nestjs/graphql';

// skills / experience / projects are added by ProfileResolver (@ResolveField), so they are only queried on demand.
@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() title: string;
  @Field() description: string;
  @Field(() => String, { nullable: true }) github?: string | null;
  @Field(() => String, { nullable: true }) linkedin?: string | null;
  @Field(() => String, { nullable: true }) telegram?: string | null;
}
