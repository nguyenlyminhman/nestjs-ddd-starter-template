import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IPasswordHasher } from "src/modules/shared/domain/repositories/password.hasher";
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PasswordVO } from "src/modules/users/domain/value-objects/password.vo";

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtService: JwtService,
  ) { }

  async execute(cmd: { username: string, password: string }) {

    const existUser = await this.userRepo.findByUsername(cmd.username);

    if (!existUser) throw new UnauthorizedException('Invalid credentials');
    const passwordVo = PasswordVO.fromHashed(existUser?.password ?? '');

    const isValid = await passwordVo.verify(cmd.password!, this.passwordHasher);

    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    const { password, ...userInfo } = existUser

    const accessToken = await this.jwtService.signAsync(userInfo);

    return { accessToken, userInfo };
  }

}