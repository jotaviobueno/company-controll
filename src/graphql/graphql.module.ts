import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { environment } from '../config/environment';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      fieldResolverEnhancers: ['guards'],
      // debug: true,
      introspection: environment.NODE_ENV !== 'production',
      formatError: (error: GraphQLError) => ({
        statusCode: (error.extensions as any)?.originalError?.statusCode,
        message:
          (error.extensions as any)?.originalError?.message ||
          (error?.extensions as any)?.stacktrace[0] ||
          (error.extensions?.response as any)?.message ||
          error?.message ||
          '-',
        error: (error.extensions as any)?.originalError?.error,
        code: error.extensions?.code || '-',
        meta: (error.extensions as any)?.response?.meta,
        path: error.path,
      }),
      resolvers: {},
      context: ({ req, res }) => ({ req, res, headers: req.headers }),
    }),
  ],
})
export class GraphqlModule {}
