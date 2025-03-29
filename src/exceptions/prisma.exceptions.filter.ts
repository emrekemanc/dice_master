import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter{
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        switch(exception.code){
            case 'P2002' : {
                status = HttpStatus.CONFLICT;
                break;
            }
            case 'P2015' : {
                status = HttpStatus.NOT_FOUND;
                break;
            }
        }
        response.status(status).json({
            statusCode: status,
            message: message
        });

        super.catch(exception,host);
    }
}