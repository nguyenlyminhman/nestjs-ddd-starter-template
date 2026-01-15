import { BadRequestException } from "@nestjs/common";
import { IPasswordHasher } from "src/modules/shared/domain/repositories/password.hasher";

export class PasswordVO {
  constructor(private readonly password: string) { }

  static async create(plainPassword: string, passwordHasher: IPasswordHasher): Promise<PasswordVO> {

    if (plainPassword.length < 8) {
      throw new BadRequestException('Password too short');
    }

    const hash = await passwordHasher.hash(plainPassword);
    return new PasswordVO(hash);
  }

  async verify(plain: string, passwordHasher: IPasswordHasher): Promise<boolean> {
    return passwordHasher.verify(plain, this.password);
  }

  static fromHashed(hashed: string): PasswordVO {
    return new PasswordVO(hashed);
  }

  get hashedPassword(): string {
    return this.password;
  }
}