import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../frontend/schema.graphql'),
      sortSchema: true,
      playground: true,
      debug: process.env.NODE_ENV !== 'production',
      path: '/v1',
      context: ({ req, connection }) => {
        if (req) {
          return req;
        } else {
          return connection;
        }
      },
    }),
    UserModule,
  ],
})
export class GraphqlModule {}
