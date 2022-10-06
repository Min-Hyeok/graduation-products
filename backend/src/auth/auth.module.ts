import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@graphql/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@auth/local.strategy';
import { LocalAuthGuard } from '@auth/local-auth.guard';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  exports: [LocalAuthGuard],
})
export class AuthModule {}
