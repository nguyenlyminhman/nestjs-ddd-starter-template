import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/repositories/user.repository";
import PaginationDto from "src/common/dto/pagination.dto";
import { UsersEntity } from "../domain/entities/users.entity";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { AppUtil } from "src/utils/app.util";

@Injectable()
export class UserPrismaRepository implements IUserRepository {

  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<UsersEntity | null> {
    const rs = await this.prisma.users.findUnique({ where: { id } });
    if (!rs) return null;
    return new UsersEntity(rs.id, rs.username, null, rs.fullname, rs.avatar, rs.created_at, rs.created_by, null, null);
  }

  async findByUsername(username: string): Promise<UsersEntity | null> {
    const rs = await this.prisma.users.findFirst({ where: { username } });
    if (!rs) return null;
    return new UsersEntity(rs.id, rs.username, rs.password, rs.fullname, rs.avatar, rs.created_at, rs.created_by, null, null);
  }

  async findAll(pagination: PaginationDto): Promise<Object | null> {
    const skipTake = AppUtil.getSkipTake(pagination);

    const totalUser = await this.prisma.users.count();
    const rs: any[] = await this.prisma.users.findMany({ ...skipTake, omit: { password: true } });

    return { data: rs, total: totalUser }
  }

  async save(user: UsersEntity): Promise<void> {
    await this.prisma.users.create({
      data: {
        id: user.id,
        username: user.username,
        password: user.password ?? '',
        fullname: user.fullname,
        avatar: user.avatar,
        created_at: user.createdAt,
        created_by: user.createdBy,
      }
    })
  }
}