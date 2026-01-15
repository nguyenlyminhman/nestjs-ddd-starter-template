import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { ServerConfigService } from './modules/shared/server-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load: [() => ({
      //   defaultLang: 'vi',
      // })],
    }),
    SharedModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
