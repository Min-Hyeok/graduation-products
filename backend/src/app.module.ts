import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { GraphqlModule } from '@graphql/graphql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, GraphqlModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
