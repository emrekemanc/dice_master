import { HttpException,HttpStatus } from "@nestjs/common";
import { NotFoundError } from "rxjs";

export class UserExceptions{
    static UserNotFound(searchData: string): HttpException{
        return new HttpException(`This User Not Found ${searchData}`,HttpStatus.NOT_FOUND);
    }
    static UserAlreadyExists(searchData: string): HttpException{
        return new HttpException(`This User Already Exists ${searchData}`,HttpStatus.CONFLICT);
    }
    static InvalidUserData(): HttpException {
        return new HttpException(`Invalid user data provided`, HttpStatus.BAD_REQUEST);
    }
    static UnauthorizedAccess(userId: string): HttpException{
        return new HttpException(`This User Does Not Have Sufficient Authority ${userId}`,HttpStatus.FORBIDDEN);
    }
    static ServerCausedError(): HttpException{
        return new HttpException(`A Server-Based Error Occurred`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


/*
class UserNotFound extends HttpException{
     constructor(private searchData: string) {
        super(`This User Not Found ${searchData}`,HttpStatus.NOT_FOUND)
     }
}*/