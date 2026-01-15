import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { ServerConfigService } from '../shared/server-config.service';
import { APP_GUARD } from '@nestjs/core';
import { PasswordHasher } from '../shared/infrastructure/bcrypt.password.hasher';
import { UserPrismaRepository } from '../users/infrastructure/user.prisma.repository';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';


@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      global: true,
      imports: [SharedModule],
      inject: [ServerConfigService],
      useFactory: (configService: ServerConfigService) => {
        const { jwtSecret, jwtExpirationTime } = configService.authConfig;

        if (!jwtSecret) throw new Error('JWT_SECRET is missing');

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpirationTime ?? 86400000000,
          },
        };
      },
    }),
  ],

  controllers: [AuthController],
  providers: [
    PrismaService,
    UsersService,
    { provide: 'IPasswordHasher', useClass: PasswordHasher },
    { provide: 'IUserRepository', useClass: UserPrismaRepository },
    {
      provide: LoginUseCase,
      useFactory: (repo, hasher, jwt) => new LoginUseCase(repo, hasher, jwt),
      inject: ['IUserRepository', 'IPasswordHasher', JwtService],
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ]
})
export class AuthModule { }
