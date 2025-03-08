import { IsString,IsUUID,IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTokenDto{

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    token: string;

    @IsString()
    refreshToken: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;
    
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
    
    @IsDate()
    @IsOptional()
    deletedAt?: Date;
}