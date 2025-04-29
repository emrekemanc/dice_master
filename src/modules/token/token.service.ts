import { BadRequestException, Catch, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GetTokenDto } from './dto/get.token.dto';
import { PayloadDto } from './dto/payload.dto';
import { CreateTokenDto } from './dto/create.token.dto';
import { ResultTokenDto } from './dto/result.token.dto';
import { RefreshTokenDto } from './dto/refresh.token.dto';

@Injectable()
export class TokenService {
    constructor(protected prismaService: PrismaService, protected jwtService: JwtService){}
    async createToken(payloadDto: PayloadDto): Promise<string>
    {
        try{
            const token: string = this.jwtService.sign(payloadDto, {expiresIn: '1h'});
            if(!token) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return token;
        }catch(e){
            throw e
        }
    }

    async createRefreshToken(payloadDto: PayloadDto): Promise<string>{
        try{
            const refreshToken: string = this.jwtService.sign(payloadDto,{expiresIn: '7d'});
            if(!refreshToken) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return refreshToken;
        }catch(e){
            throw new InternalServerErrorException('An Error Occurred During Token Generation');
        }
    }

    async foundToken(userId: string): Promise<[GetTokenDto]>{
        try{
            const tokens: [GetTokenDto] = await this.prismaService.token.findMany({
                where: {userId: userId, deletedAt: null },
            }) as [GetTokenDto];
            if(!tokens) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return tokens;
        }catch(e){
            throw new InternalServerErrorException('An Error Occurred During Token Generation');
        }
    }

    async savedTokens(createTokenDto: CreateTokenDto): Promise<ResultTokenDto>{
        try{
           const tokens: ResultTokenDto = await this.prismaService.token.create({
                data: createTokenDto
            }) as ResultTokenDto;
            if(!tokens) throw new InternalServerErrorException('An Error Occurred During Token Generation');
            return tokens;
        }catch(e){
            throw new InternalServerErrorException(e);
        }
    }

    async generateToken(payloadDto: PayloadDto): Promise<ResultTokenDto>{
      try { 
        const token: string = await this.createToken(payloadDto);
        const refreshToken: string = await this.createRefreshToken(payloadDto);
        const foundToken: [GetTokenDto] = await this.foundToken(payloadDto.sub);
       foundToken?.map(async (token) =>{
        await this.deleteToken(token.id);
        })
        const tokens = await this.savedTokens({userId:payloadDto.sub ,token: token ,refreshToken: refreshToken});
        return tokens;
     }catch(e){
        throw e;
        }
        }
    
    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<ResultTokenDto>{
       try{
        const decoded: PayloadDto = await this.validateRefreshToken(refreshTokenDto.refreshToken);
        if(!decoded) throw new InternalServerErrorException('Dont Decoded Token');
        const newTokens: ResultTokenDto =  await this.generateToken({sub: decoded.sub,userRole: decoded.userRole})
        if(!newTokens) throw new InternalServerErrorException('An Error Occurred During Token Generation');
        return newTokens;
       }catch(e){
        throw e;
       }

    }

    async validateRefreshToken(refreshToken: string): Promise<PayloadDto>{
       try{ const tokenData: GetTokenDto = await this.prismaService.token.findUnique({
            where: {refreshToken: refreshToken}
        }) as GetTokenDto;
        if(!tokenData) throw new InternalServerErrorException('Dont Found Token');
        if(tokenData.deletedAt) throw new BadRequestException('Token Not Active')
            const data: PayloadDto = await this.jwtService.verify(tokenData.refreshToken);
        return data;

    }catch(e){
           throw e;
        }
    }

    async deleteToken(tokenId: string): Promise<GetTokenDto>{
        try{
            const deletedat: GetTokenDto = await this.prismaService.token.update({
                where: {id: tokenId},
                data: {deletedAt: new Date()}
            }) as GetTokenDto;
            if(!deletedat) throw new UnauthorizedException('Dont Deleted Token')
            return deletedat;
        }catch(e){
            throw new UnauthorizedException('Dont Deleted Token')
        }
    }

}
