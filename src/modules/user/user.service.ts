import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { GetUserDto } from './dtos/get.user.dto';
import { UserRole } from '@prisma/client';
import { UserExceptions } from 'src/exceptions/user.exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';




@Injectable()
export class UserService {
    constructor(protected prismaService: PrismaService){}

    async createUser(userDto: CreateUserDto): Promise<GetUserDto>{
        try{
            const user = await this.prismaService.user.create({
                data: userDto
            }) as GetUserDto;
            //if(!user) throw UserExceptions.ServerCausedError();
            return user;
        }catch(e){
           throw e;
        }
    }

    async deletedUser(userId: string): Promise<boolean>{
        try{
            await this.prismaService.user.delete({
                where: {id: userId}
            });
            return true;
        }catch(e){
            throw e;
        }
    }
    
    async getUserWhitId(userId: string): Promise<GetUserDto>{
        try{
            
            const user: GetUserDto = await this.prismaService.user.findUnique({
                where: {id: userId}
            }) as GetUserDto;
            if(!user){
                throw UserExceptions.UserNotFound(userId);
            }
            return user
        }catch(e){
            throw e
        }

    }
    async getUserWhitMail(mail: string): Promise<GetUserDto>{
    try{
            const user: GetUserDto = await this.prismaService.user.findUnique({
        where: {mail: mail}
    }) as GetUserDto;
    if(!user){
        throw UserExceptions.UserNotFound(mail);
    }
    return user;
    }catch(e){
        throw e
    }

    }
    async getUserRoleWithUserId(userId: string): Promise<UserRole>{
        try{
            const userRole = await this.prismaService.user.findUnique({
                where: {id: userId},
                select: {userRole: true}
            });
            if(!userRole){
                throw UserExceptions.UserNotFound(userId)
            };
            return userRole.userRole;
        }catch(e){
            throw e
        }
    }
    async getMailWithUserId(userId: string): Promise<string>{
        try{
            const mail = await this.prismaService.user.findUnique({
                where: {id: userId},
                select: {mail: true}
            }) ;
            if(!mail){
                throw UserExceptions.UserNotFound(userId)
            };
            return mail.mail;

        }catch(e){
            throw e;
        }
    }
    async userValidation(createUserDto: CreateUserDto){
        const mail = await this.prismaService.user.findUnique({
            where: {mail: createUserDto.mail}
        });
        if(mail){
            throw UserExceptions.UserAlreadyExists(createUserDto.mail);
        }
        const userName = await this.prismaService.user.findUnique({
            where: {userName: createUserDto.userName}
        });
        if(userName){
            throw UserExceptions.UserAlreadyExists(createUserDto.userName);
        }
        const msisdn  = await this.prismaService.user.findUnique({
            where: {msisdn: createUserDto.msisdn}
        });
        if(msisdn){
            throw UserExceptions.UserAlreadyExists(createUserDto.msisdn!);
        }
        return true;
    
    }

}
