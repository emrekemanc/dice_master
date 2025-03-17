import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'dns';
import { GetTokenDto } from './dto/get.token.dto';
@Injectable()
export class TokenService {
    private readonly jwtSecret = process.env.JWT_SECRET;
    constructor(protected prismaService: PrismaService, protected jwtService: JwtService){}
    
    async createToken(userId: string,userRole: string): Promise<string>
    {
        try{
            const token = this.jwtService.sign({ userId: userId, userRole: userRole });
            if(!token) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return token;
        }catch(e){
            throw new InternalServerErrorException(e);
        }
    }

    async createRefreshToken(userId: string,userRole: string): Promise<string>{
        try{
            const refreshToken = this.jwtService.sign({userId: userId, userRole: userRole },{expiresIn: '7d'});
            if(!refreshToken) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return refreshToken;
        }catch(e){
            throw new InternalServerErrorException(e);
        }
        
    }
    async savedTokens(token: string,refreshToken: string, userId: string){
        try{
            return this.prismaService.token.create({
                data: {userId: userId,
                        token: token,
                        refreshToken: refreshToken
                }
            });
        }catch(e){
            throw new InternalServerErrorException(e);
        }
    }

    async generateToken(userId: string, userRole: string){
        const token = await this.createToken(userId,userRole);
        const refreshToken = await this.createRefreshToken(userId,userRole);
        await this.savedTokens(token,refreshToken,userId);
        return {token,refreshToken};
    }
    
    async refreshToken(refreshToken: string){
       try{ 
        const decoded = await this.validateRefreshToken(refreshToken);
        if(!decoded) throw new InternalServerErrorException('Dont Decoded Token');
        return await this.generateToken(decoded.userId,decoded.userRole);
       }catch(e){
        throw new InternalServerErrorException(e);
       }

    }

    async validateRefreshToken(refreshToken: string){
       try{ const tokenData = await this.prismaService.token.findUnique({
            where: {refreshToken: refreshToken}
        }) as GetTokenDto;
        if(!tokenData) throw new InternalServerErrorException('Dont Found Token');

        return await this.jwtService.verify(tokenData.refreshToken);}catch(e){
           throw new InternalServerErrorException(e);
        }
    }

}
