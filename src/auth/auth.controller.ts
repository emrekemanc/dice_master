import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { RegisterDto } from './dtos/auth.dto';

@Controller('Auth')
export class AuthController {
constructor(protected authService: AuthService){}

    @Post('Register')
    async registerUser(@Body() authDto: RegisterDto){
        return this.authService.registerUser(authDto);
    }
}
