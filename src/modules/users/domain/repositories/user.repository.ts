import PaginationDto from "src/common/dto/pagination.dto";
import { UsersEntity } from "../entities/users.entity";

export interface IUserRepository { 
    findById(id: string): Promise<UsersEntity | null>;

    findByUsername(username: string): Promise<UsersEntity | null>;

    findAll(pagination: PaginationDto): Promise<Object | null>;
    
    save(user: UsersEntity): Promise<void>;
}