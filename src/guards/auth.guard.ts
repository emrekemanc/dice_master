import { Injectable,ExecutionContext,UnauthorizedException, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from '@nestjs/passport';
import { GlobalExceptionFilter } from "src/exceptions/exceptions.filter";
import { TokenService } from "src/modules/token/token.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private jwtService: JwtService){
        super();
    }

    canActivate(context: ExecutionContext): boolean{

        const rq =  context.switchToHttp().getRequest();
        const authHeader = this.extractTokenFromHeader(rq)
        if(!authHeader) throw new UnauthorizedException('Token Not Found');
        try{
            const decoded = this.jwtService.verify(authHeader,{secret: process.env.JWT_SECRET});

            rq['user'] = decoded
            return true;
        }catch(e){
            return false
        }
       
    }
    private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'] as string;
    if (authorization) {
      return authorization.replace(/Bearer\s+/i, '');
    }
    }

}