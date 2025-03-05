import { IsString, IsOptional, IsEmail, IsInt, IsUUID, IsEnum, IsDate } from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsEmail()
  mail: string;

  @IsString()
  @IsOptional()
  msisdn?: string;

  @IsInt()
  @IsOptional()
  userRank?: number;

  @IsInt()
  @IsOptional()
  userXp?: number;

  @IsEnum(UserRole)
  @IsOptional()
  userRole?: UserRole;

  @IsEnum(UserStatus)
  @IsOptional()
  userStatus?: UserStatus;

  @IsString()
  @IsOptional()
  avatarsId?: string;

  @IsDate()
  @IsOptional()
  userBirthDate?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  @IsDate()
  @IsOptional()
  lastActive?: Date;
}

