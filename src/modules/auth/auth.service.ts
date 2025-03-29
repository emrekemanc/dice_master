import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { TokenService } from '../token/token.service';
import { PasswordService } from '../password/password.service';
import { RegisterDto } from './dtos/register.auth.dto';
import { LoginDto } from './dtos/login.auth.dto';
import { ResultTokenDto } from '../token/dto/result.token.dto';



@Injectable()
export class AuthService {
    constructor(private userService: UserService, private tokenService: TokenService,private passwordService: PasswordService){}
    
    async loginUser(loginDto: LoginDto): Promise<ResultTokenDto>{
        try{
            const user = await this.userService.getUserWhitMail(loginDto.mail);
            if(!user) throw new  BadRequestException('User not found');
            const isMatchd = this.passwordService.comparePassword(loginDto.password, user.id);
            if(await isMatchd == false) throw new BadRequestException('Password does not match');
            const tokens = this.tokenService.generateToken({userId: user.id,userRole: user.userRole});
            if(!tokens) throw new BadRequestException("Tokens could not be registered");
            return tokens;
        }catch(e){
            throw new BadRequestException('User Not Login');
        }

    }

    async logout(tokenId: string){
        return await this.tokenService.deleteToken(tokenId);
    }

    async registerUser(registerDto: RegisterDto): Promise<ResultTokenDto>{
        try{   
            const {password ,...createUserDto} = registerDto
            const user = await this.userService.createUser(createUserDto);
            
            const hashPassword = await this.passwordService.hashPassword(registerDto.password);
            if(!user || !hashPassword) throw new BadRequestException("creating error user or password ");
            const createPassword = await this.passwordService.addPassword({userId: user.id, hashPassword: hashPassword});
            if(createPassword == false){
                await this.userService.deletedUser(user.id);
                throw new BadRequestException("password error");
            }
            const tokens = this.tokenService.generateToken({userId: user.id, userRole: user.userRole});
            if(!tokens){
                throw new BadRequestException("Tokens could not be registered");
            }
            return tokens;
        }catch(e){
            throw e;
        }
    }
    
   
}
