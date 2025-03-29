import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PasswordService, PrismaService],
  exports: [PasswordService],
  imports: [PrismaModule],  
})
export class PasswordModule {}
