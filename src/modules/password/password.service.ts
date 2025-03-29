import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePasswordDto } from './dtos/create.password.dto';

@Injectable()
export class PasswordService {
    constructor(private prismaService: PrismaService){}
private readonly saltRounds = 10;

async hashPassword(password: string): Promise<string>{
return bcrypt.hash(password, this.saltRounds);
}

async comparePassword(password: string, userId: string): Promise<boolean>{
    try{
        const hashPassword = await this.prismaService.password.findUnique({
            where: {userId: userId}
        });
        if(!hashPassword){
            return false;
        }
        return bcrypt.compare(password,hashPassword.hashPassword);
    }
    catch(e){
        return false
    }
}
async addPassword(createPasswordDto: CreatePasswordDto): Promise<boolean>{
   try{
    await this.prismaService.password.create({
        data: createPasswordDto
    });
    return true
}
catch(e){
    return false
}
}

}
