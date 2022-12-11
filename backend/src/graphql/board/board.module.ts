import { CacheModule, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@graphql/board/entities/board.entity';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule,
    CacheModule.register(),
  ],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
