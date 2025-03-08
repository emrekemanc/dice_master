import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { RegisterDto } from './dtos/register.auth.dto';
import { LoginDto } from './dtos/login.auth.dto';

@Controller('Auth')
export class AuthController {
constructor(protected authService: AuthService){}

    @Post('Register')
    async registerUser(@Body() registerDto: RegisterDto){
        return this.authService.registerUser(registerDto);
    }
    @Post('Login')
    async loginUser(@Body() loginDto: LoginDto){
        return this.authService.loginUser(loginDto)
    }
}
