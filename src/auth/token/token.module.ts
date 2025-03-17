import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TokenService,PrismaService],
  exports: [TokenService ],
  imports: [PrismaModule,],

})
export class TokenModule {}
