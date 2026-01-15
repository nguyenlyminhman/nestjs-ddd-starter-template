import { Module } from '@nestjs/common';
import { ServerConfigService } from './server-config.service';

@Module({
  providers: [
    ServerConfigService,
    // { provide: 'IPasswordHasher', useClass: PasswordHasher },
  ],
  exports: [
    ServerConfigService,
    // 'IPasswordHasher'
  ],
})
export class SharedModule { }