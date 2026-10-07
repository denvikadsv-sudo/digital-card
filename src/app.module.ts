import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

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
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: false })],
    }),
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}
