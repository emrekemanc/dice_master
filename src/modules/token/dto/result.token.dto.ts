import { IsNotEmpty, IsString } from "class-validator";

export class ResultTokenDto{
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}