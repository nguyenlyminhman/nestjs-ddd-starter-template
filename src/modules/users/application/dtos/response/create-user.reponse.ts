import { UsersEntity } from "src/modules/users/domain/entities/users.entity";


export class CreateUserResponse {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly fullname: string | null,
    public readonly avatar: string | null,
    public readonly createdAt: Date | null,
    public readonly createdBy: string | null,
  ) { }

  static from(user: UsersEntity): CreateUserResponse {
    return new CreateUserResponse(
      user.id, 
      user.username, 
      user.fullname, 
      user.avatar, 
      user.createdAt, 
      user.createdBy)
  }
}