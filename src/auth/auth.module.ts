import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token/token.service';
import { PasswordService } from './password/password.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PasswordModule } from './password/password.module';
import { PrismaModule } from 'src/prisma/prisma.module'; 
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  providers: [AuthService, TokenService, PasswordService, UserService],
  controllers: [AuthController],
  imports: [UserModule, PasswordModule, PrismaModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: 60}
  })],  
})
export class AuthModule {}
