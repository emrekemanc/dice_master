import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { use } from 'passport';
import { GetUserDto } from './dtos/get.user.dto';


@Injectable()
export class UserService {
    constructor(protected prismaService: PrismaService){}

    async createUser(userDto: CreateUserDto){
        try{
            
            const user = await this.prismaService.user.create({
                data: userDto
            });
            
            return user.id;
        }catch(e){
            console.log(e)
        }

    }
    async deletedUser(userId: string): Promise<boolean>{
        try{
            await this.prismaService.user.delete({
                where: {id: userId}
            });
            return true
        }catch(e){
            return false
        }
    }
    
    async getUserWhitId(userId: string): Promise<GetUserDto>{
        try{
            const user: GetUserDto = await this.prismaService.user.findUnique({
                where: {id:userId}
            }) as GetUserDto;
            if(!user){
                throw new Error('User Not Found');
            }
            return user
        }catch(e){
            throw new Error(e)
        }

    }
    async getUserIdWhitMail(mail: string){
    try{
            const user: GetUserDto = await this.prismaService.user.findUnique({
        where: {mail: mail}
    }) as GetUserDto;

    if(!user){
        throw new Error("User Not Found");

    }
    return user.id;

    }catch(e){console.log(e)}
        
    }

}
