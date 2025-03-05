import { IsString, IsOptional, IsUUID, Length, IsNotEmpty } from 'class-validator';

export class CreatePasswordDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @Length(8, 255) 
  hashPassword: string;

  @IsUUID()
  @IsOptional()
  lastPasswordId?: string;
}