import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenController } from './token.controller';

@Module({
  controllers: [TokenController],
  imports: [
    PrismaModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET
    }),
  ],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
