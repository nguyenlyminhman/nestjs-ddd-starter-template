import { BaseEntity } from "src/modules/shared/domain/entities/base-entity";

export class UsersEntity extends BaseEntity {
  constructor(
    public readonly id: string,
    public username: string,
    public password: string | null,
    public fullname: string | null,
    public avatar: string | null,
    createdAt: Date | null,
    createdBy: string | null,
    updatedAt: Date | null,
    updatedBy: string | null,
  ) {
    super(createdAt, createdBy, updatedAt, updatedBy);
  }

  static create(
    username: string,
    password: string,
    fullname: string | null,
    avatar: string | null,
    createdBy: string | null,
  ): UsersEntity {
    const now = new Date();

    return new UsersEntity(
      crypto.randomUUID(),
      username,
      password,
      fullname,
      avatar,
      now,
      createdBy,
      null,
      null,
    );
  }
}
