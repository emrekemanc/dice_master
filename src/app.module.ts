import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PasswordModule } from './auth/password/password.module';
import { TokenModule } from './auth/token/token.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PasswordModule, TokenModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
