import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './application/dtos/commands/create-user.dto';
import { AppUtil } from 'src/utils/app.util';
import { ResponseDto } from 'src/common/payload.data';
import PaginationDto from 'src/common/dto/pagination.dto';
import MetadataDto from 'src/common/dto/metadata.dto';
import { users } from '@prisma/client'; 

@Injectable()
export class UsersService {

	constructor(readonly prisma: PrismaService) { }

	async create(userData: CreateUserDto): Promise<ResponseDto> {
		try {
			userData.password = AppUtil.generatePassword(userData.password);
			const createdUser = await this.prisma.users.create({ data: { ...userData, id: crypto.randomUUID(), } });

			return new ResponseDto(createdUser, new MetadataDto());
		} catch (error) {
			console.log('Error creating user:', error);

			throw error;
		}
	};

	async findAll(pagination: PaginationDto): Promise<ResponseDto> {
		try {
			const skipTake = AppUtil.getSkipTake(pagination);

			const totalUsers = await this.prisma.users.count();
			const meta = new MetadataDto(pagination, totalUsers);
			const userList = await this.prisma.users.findMany({
				...skipTake, select: {
					id: true,
					username: true,
					fullname: true,
					avatar: true
				}
			});

			return new ResponseDto(userList, meta);
		} catch (error) {
			console.log('Error finding users:', error);

			throw error;
		}
	}

	async findByUsername(username: string): Promise<users | null> {
		try {
			return await this.prisma.users.findFirst({
				where: { username: username },
			});
		} catch (error) {
			throw error;
		}
	}

}
