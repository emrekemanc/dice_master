import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayloadDto } from './dto/payload.token.dto';
import { CreateTokenDto } from './dto/create.token.dto';
import { GetUserDto } from 'src/user/dtos/get.user.dto';
@Injectable()
export class TokenService {
    private readonly jwtSecret = process.env.JWT_SECRET;
    constructor(protected prismaService: PrismaService){}
    
    createToken(payloadDto: PayloadDto){
    try{
        if(!payloadDto ){
        throw new Error('Payload is not defined!');
        }
        if (!this.jwtSecret) {
        throw new Error('JWT_SECRET is not defined!');
      }
        const userId = payloadDto.userId
        const userRole = payloadDto.userRole
        const mail = payloadDto.mail
        const payload = {userId,userRole,mail}
        return jwt.sign(payload, this.jwtSecret,{ expiresIn: '1h' });
        }
    catch(e){
        throw new Error(e);
        }
        
    }

    createRefreshToken(){
        try{
            if (!this.jwtSecret) {
                throw new Error('JWT_SECRET is not defined!');
              }
            return jwt.sign({}, this.jwtSecret, { expiresIn: '7d' });
        }
        catch(e){
            throw new Error(e);
        }

    }
    async saveTokens(user: GetUserDto){
        try{ 
            const userId = user.id;
            const userRole = user.userRole;
            const mail = user.mail;
            const payload: PayloadDto = {userId: userId, userRole: userRole, mail: mail}
            const token = this.createToken(payload)
            const refreshToken = this.createRefreshToken()
            const tokens = await this.prismaService.token.create({
                data: {userId: user.id,
                       token: token,
                       refreshToken: refreshToken
                }
            });
            if(!tokens){
                throw new Error("Token Not Saved")
            }
            return true
        }catch(e){
            throw new Error(e);
        }
    }
}
