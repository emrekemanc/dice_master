import { IsUUID,IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';
export class PayloadDto{
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    userRole: UserRole;
}