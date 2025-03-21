import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { GetUserDto } from './dtos/get.user.dto';
import { UserRole } from '@prisma/client';



@Injectable()
export class UserService {
    constructor(protected prismaService: PrismaService){}

    async createUser(userDto: CreateUserDto): Promise<GetUserDto>{
        try{
            
            const user = await this.prismaService.user.create({
                data: userDto
            }) as GetUserDto;
            if(!user) throw new InternalServerErrorException('User Dont Created');
            return user;
        }catch(e){
            throw new InternalServerErrorException('User Dont Created');
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
                throw new NotFoundException('User Not Found');
            }
            return user
        }catch(e){
            throw new NotFoundException('User Not Found');
        }

    }
    async getUserWhitMail(mail: string): Promise<GetUserDto>{
    try{
            const user: GetUserDto = await this.prismaService.user.findUnique({
        where: {mail: mail}
    }) as GetUserDto;

    if(!user){
        throw new NotFoundException("User Not Found");

    }
    return user;

    }catch(e){
        throw new NotFoundException("User Not Found");
    }
        
    }
    async getUserRoleWithUserId(userId: string): Promise<UserRole>{
        try{
            const userRole = await this.prismaService.user.findUnique({
                where: {id: userId},
                select: {userRole: true}
            });
            if(!userRole){
                throw new NotFoundException("Failed to Capture Data")
            };
            return userRole.userRole;

        }catch(e){
            throw new NotFoundException("Failed to Capture Data")
        }
    }
    async getMailWithUserId(userId: string): Promise<string>{
        try{
            const mail = await this.prismaService.user.findUnique({
                where: {id: userId},
                select: {mail: true}
            }) ;
            if(!mail){
                throw new NotFoundException("Failed to Capture Data")
            };
            return mail.mail;

        }catch(e){
            throw new NotFoundException("Failed to Capture Data")
        }
    }

}
