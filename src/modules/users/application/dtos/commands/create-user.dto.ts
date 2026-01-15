import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  avatar: string;

}