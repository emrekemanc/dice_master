import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";


@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.message;

        response.status(status).json({
            statusCode: status,
            message: message,

        });
    }

}