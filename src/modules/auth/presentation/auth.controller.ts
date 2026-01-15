import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { UserLoginDto } from '../application/dtos/login.dto';
import { ResponseApi } from 'src/common/response.helper';
import { Public } from 'src/decorator/public.decorator';
import { EApiPath, VERSION_1 } from 'src/objects/enum/EApiPath.enum';
import { LoginUseCase } from '../application/use-cases/login.usecase';

@ApiTags('Auth')
@Controller({ path: EApiPath.AUTH, version: VERSION_1 })
export class AuthController {
  constructor(
    readonly loginUseCase: LoginUseCase
  ) { }

  @Public()
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi', })
  async creatUser(@I18n() i18n: I18nContext, @Body() userLoginDto: UserLoginDto): Promise<ResponseApi> {
    // const rs: ResponseDto = await this.authService.login(userLoginDto);
    const rs = await this.loginUseCase.execute(userLoginDto);
    return ResponseApi.success(rs, i18n.t('root.login_success'), HttpStatus.ACCEPTED);
  }

}
