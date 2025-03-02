import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
private readonly saltRounds = 10;

async hashPassword(password: string): Promise<string>{
return bcrypt.hash(password, this.saltRounds);
}

async comparePassword(password: string,hashPassword: string): Promise<boolean>{
    return bcrypt.compare(password,hashPassword);
}

}
