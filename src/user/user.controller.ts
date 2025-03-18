import { Controller, Post, UseGuards,Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
   constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req){
        return this.userService.getUserWhitId(req.user.userId);
    }

}
