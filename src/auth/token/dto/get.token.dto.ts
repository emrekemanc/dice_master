import { IsString,IsUUID,IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class GetTokenDto{

    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
    
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
    
    @IsDate()
    @IsOptional()
    deletedAt?: Date;
}