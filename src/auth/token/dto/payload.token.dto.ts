import { IsString,IsUUID,IsOptional, IsNotEmpty, IsDate, IsEnum, IsEmail } from 'class-validator';
import { UserRole } from '@prisma/client';
export class PayloadDto{
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole: UserRole;

    @IsEmail()
    @IsNotEmpty()
    mail: string;
}