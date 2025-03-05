import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';  // PrismaModule import edildi

@Module({
  providers: [PasswordService, PrismaService],
  exports: [PasswordService],
  imports: [PrismaModule],  // PrismaModule import edildi
})
export class PasswordModule {}
