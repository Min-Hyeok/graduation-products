import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@graphql/user/entities/user.entity';
import { Board } from '@graphql/board/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pets',
      entities: [User, Board],
      synchronize: process.env.NODE_ENV !== 'production',
      cache: {
        type: 'redis',
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
