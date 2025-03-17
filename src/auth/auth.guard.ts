import { Injectable,CanActivate,ExecutionContext,UnauthorizedException } from "@nestjs/common";
import { TokenService } from "./token/token.service";
import { Request } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

}