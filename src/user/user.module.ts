import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  providers: [UserService, PrismaService],
  exports: [UserService],  
})
export class UserModule {}
