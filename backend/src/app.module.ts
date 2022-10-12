import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { GraphqlModule } from '@graphql/graphql.module';
import { AuthModule } from '@auth/auth.module';
import { CacheModule } from '@cache/cache.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, AuthModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
