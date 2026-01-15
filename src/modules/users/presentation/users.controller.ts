import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users.service';
import { ResponseApi } from '@/common/response.helper';
import { I18n, I18nContext } from 'nestjs-i18n';
import PaginationDto from '@/common/dto/pagination.dto';
import { ResponseDto } from '@/common/payload.data';
import { EApiPath, VERSION_1 } from '@/objects/enum/EApiPath.enum';
import { Public } from '@/decorator/public.decorator';
import { User } from '@/decorator/user.decorator';
import { CreateUserDto } from '../application/dtos/commands/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { GetAllUserUseCase } from '../application/use-cases/get-all-user.usecase';

@ApiTags('Users')
@Controller({ path: EApiPath.USER, version: VERSION_1 })
export class UsersController {

  constructor(
    readonly usersService: UsersService,
    readonly createUserUseCase: CreateUserUseCase,
    readonly getAllUserUseCase: GetAllUserUseCase
  ) { }

  @Public()
  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi', })
  async creatUser(@I18n() i18n: I18nContext, @User() user: any, @Body() dto: CreateUserDto): Promise<ResponseApi> {
    const rs = await this.createUserUseCase.execute({
      username: dto.username,
      password: dto.password,
      fullname: dto.fullname,
      avatar: dto.avatar,
      createdBy: user?.id ?? 'SYSTEM',
    });

    return ResponseApi.success(rs, i18n.t('root.create_success'), HttpStatus.ACCEPTED);
  }

  @Get("/get-all")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({ description: 'Get all users' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi' })
  async findAllUsers(@I18n() i18n: I18nContext, @User() user: any, @Query() pagination: PaginationDto): Promise<ResponseApi> {
    const data = await this.getAllUserUseCase.execute(pagination);
    return ResponseApi.success(data, i18n.t('root.get_success'), HttpStatus.OK);
  }
}
