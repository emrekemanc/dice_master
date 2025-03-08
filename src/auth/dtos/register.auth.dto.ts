import { IsString, IsOptional, IsEmail, IsDate } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsEmail()
  mail: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  msisdn?: string;

  @IsString()
  @IsOptional()
  avatarsId?: string;

  @IsDate()
  @IsOptional()
  userBirthDate?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
