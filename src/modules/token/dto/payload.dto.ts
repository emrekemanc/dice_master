import { IsUUID,IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';
export class PayloadDto{
    @IsUUID()
    @IsNotEmpty()
    sub: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole: UserRole;
}