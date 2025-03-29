import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService){}
    @Post('refresh')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        return this.tokenService.refreshToken(refreshTokenDto);
    }
}
