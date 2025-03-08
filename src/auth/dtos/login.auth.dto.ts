import { IsString, IsEmail } from 'class-validator';

export class LoginDto{
    @IsEmail()
    mail: string;
    @IsString()
    password: string;

}