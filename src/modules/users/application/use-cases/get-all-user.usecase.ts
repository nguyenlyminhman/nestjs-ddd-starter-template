import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.repository";
import PaginationDto from "src/common/dto/pagination.dto";
import MetadataDto from "src/common/dto/metadata.dto";
import { ResponseDto } from "src/common/payload.data";

@Injectable()
export class GetAllUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(pagination: PaginationDto) {
    const rs: any = await this.userRepo.findAll({...pagination});
    
    const meta = new MetadataDto(pagination, rs?.total);

    return new ResponseDto(rs.data, meta);
  }
}