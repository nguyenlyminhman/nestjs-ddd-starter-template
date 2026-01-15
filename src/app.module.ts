import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { ServerConfigService } from './modules/shared/server-config.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load: [() => ({
      //   defaultLang: 'vi',
      // })],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ServerConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        loaderOptions: {
          path: configService.isDevelopment ? join(process.cwd(), 'src/i18n') : join(__dirname, '/i18n'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      inject: [ServerConfigService],
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    SharedModule,
    UsersModule,
    AuthModule,
    PrismaModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
