import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

    if (!response) {
        throw new Error('Response object is undefined');
      }
        let message = "An unexpected database error occurred.";
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.code) {
            case "P2002": {
                status = HttpStatus.BAD_REQUEST;
                message = "A unique constraint violation occurred. The provided value already exists.";
                break;
            }
            case "P2003": {
                status = HttpStatus.BAD_REQUEST;
                message = "A foreign key constraint violation occurred. The referenced record does not exist.";
                break;
            }
            case "P2011": {
                status = HttpStatus.BAD_REQUEST;
                message = "A required field is missing or cannot be null.";
                break;
            }
            case "P2025": {
                status = HttpStatus.NOT_FOUND;
                message = "The requested record was not found.";
                break;
            }
            case "P1001": {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = "Database connection failed. Ensure the database is running and accessible.";
                break;
            }
            case "P1002": {
                status = HttpStatus.SERVICE_UNAVAILABLE;
                message = "Database is not available at the moment. Please try again later.";
                break;
            }
            case "P1010": {
                status = HttpStatus.FORBIDDEN;
                message = "Insufficient database privileges to perform this operation.";
                break;
            }
            case "P5000": {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                message = "Prisma engine crashed unexpectedly.";
                break;
            }
            default:
                message = exception.message;
        }

       
    response.status(status).json({
        statusCode: status,
        message,
        error: exception.code,
      });

        super.catch(exception, host);
    }
}
