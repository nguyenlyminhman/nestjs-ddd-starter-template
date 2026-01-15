import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordHasher } from '../shared/infrastructure/bcrypt.password.hasher';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserPrismaRepository } from './infrastructure/user.prisma.repository';
import { GetAllUserUseCase } from './application/use-cases/get-all-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: 'IPasswordHasher', useClass: PasswordHasher },
    { provide: 'IUserRepository', useClass: UserPrismaRepository },
    {
      provide: CreateUserUseCase,
      useFactory: (repo, hasher) => new CreateUserUseCase(repo, hasher),
      inject: ['IUserRepository', 'IPasswordHasher',],
    },
    {
      provide: GetAllUserUseCase,
      useFactory: (repo) => new GetAllUserUseCase(repo),
      inject: ['IUserRepository'],
    },
  ],
})
export class UsersModule { }
