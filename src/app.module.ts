import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

// Opens Apollo Sandbox with a ready query: switch the language by editing the `locale` variable (EN / RU).
const SANDBOX_QUERY = `query Profile($locale: Locale = RU) {
  profile(locale: $locale) {
    name
    title
    description
    github
    telegram
    skills { name category }
    experience { company position startDate endDate achievements }
    projects { name url description }
  }
}
`;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      introspection: true,
      playground: false, // the legacy Playground is replaced by Apollo Sandbox below
      // Apollo Sandbox at /graphql, also in production: the app is a public showcase.
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          embed: true,
          includeCookies: false,
          document: SANDBOX_QUERY,
          variables: { locale: 'RU' },
        }),
      ],
    }),
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}
