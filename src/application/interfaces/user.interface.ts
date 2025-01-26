import { CreateUserDto } from "../dtos/CreateUserDto";

// IServiceInterface.ts
export interface IUserService {
    createUser(dto: CreateUserDto): Promise<void>;
}
