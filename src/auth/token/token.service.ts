import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { PayloadDto } from './dto/payload.token.dto';
import { CreateTokenDto } from './dto/create.token.dto';
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
    async saveTokens(createTokenDto: CreateTokenDto){
        try{    
            const token = await this.prismaService.token.create({
                data: createTokenDto
            });
            if(!token){
                throw new Error("Token Not Saved")
            }
            return true
        }catch(e){
            throw new Error(e);
        }
    }
}
