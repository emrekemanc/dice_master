import { IsString, IsEmail, IsInt, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '@prisma/client';

export class GetUserDto {
  @IsUUID()
  id: string;

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
  userRole: UserRole;

  @IsEnum(UserStatus)
  userStatus: UserStatus;

  @IsString()
  @IsOptional()
  avatarsId?: string;

  @IsString()
  @IsOptional()
  userBirthDate?: Date;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  @IsString()
  @IsOptional()
  deletedAt?: Date;

  @IsString()
  @IsOptional()
  lastActive?: Date;
}
