import { IPasswordHasher } from "../domain/repositories/password.hasher";
import * as bcrypt from 'bcrypt';

const saltRounds = 12;
export class PasswordHasher implements IPasswordHasher{

    async hash(password: string): Promise<string> {
        return bcrypt.hashSync(password, saltRounds);
    }

    async verify(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password || '', hash || '');
    }
}
