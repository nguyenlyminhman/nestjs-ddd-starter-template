import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UsersEntity } from "../../domain/entities/users.entity";
import { CreateUserResponse } from "../dtos/response/create-user.reponse";
import { PasswordVO } from "../../domain/value-objects/password.vo";
import { IPasswordHasher } from "src/modules/shared/domain/repositories/password.hasher";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) { }

  async execute(cmd: { username: string, password: string, fullname: string, avatar: string, createdBy: string }) {

    const passwordVo = await PasswordVO.create(cmd.password, this.passwordHasher);    
    const user = UsersEntity.create(cmd.username, passwordVo.hashedPassword, cmd.fullname, cmd.avatar, cmd.createdBy);
    
    console.log('user', user);
    
    const exist = await this.userRepo.findByUsername(user.username);
    console.log('exist', exist);
    if (exist) {
      throw new ConflictException("Username is exist")
    }
  
    await this.userRepo.save(user);

    return CreateUserResponse.from(user);
  }
}