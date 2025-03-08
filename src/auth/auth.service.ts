import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token/token.service';
import { GetUserDto } from 'src/user/dtos/get.user.dto';
import { PasswordService } from './password/password.service';
import { CreatePasswordDto } from './password/dtos/create.password.dto';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { RegisterDto } from './dtos/register.auth.dto';
import { LoginDto } from './dtos/login.auth.dto';



@Injectable()
export class AuthService {
    constructor(private userService: UserService, private tokenService: TokenService,private passwordService: PasswordService){}
    
    async loginUser(loginDto: LoginDto): Promise<GetUserDto>{
        try{
            const userId = await this.userService.getUserIdWhitMail(loginDto.mail);
            if(!userId){
                throw new  BadRequestException('User not found');
            }
            const isMatchd = this.passwordService.comparePassword(loginDto.password,userId);
            if(await isMatchd == false){
                throw new BadRequestException('Password does not match');
            }
            const payload = {}
            return await this.userService.getUserWhitId(userId);
        }catch(e){
            throw new Error(e);
        }

    }
    async registerUser(registerDto: RegisterDto){
        try{   
            const createUserDto: CreateUserDto = {
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                userName: registerDto.userName,
                mail: registerDto.mail,
                msisdn: registerDto.msisdn,
                avatarsId: registerDto.avatarsId,
                userBirthDate: registerDto.userBirthDate,
                createdAt: registerDto.createdAt
            }
            const userId = await this.userService.createUser(createUserDto);
            const hashPassword = await this.passwordService.hashPassword(registerDto.password);
            if(!userId || ! hashPassword){
                throw new BadRequestException("creating error user or password ");
            }
            const passwordDto: CreatePasswordDto = {userId,hashPassword}
            const createPassword = await this.passwordService.addPassword(passwordDto);
            if(createPassword == false){
                await this.userService.deletedUser(userId);
                throw new BadRequestException("password error")
            }
            return "creat user"
        }catch(e){
            throw new Error(e)
        }
    }
    
   
}
