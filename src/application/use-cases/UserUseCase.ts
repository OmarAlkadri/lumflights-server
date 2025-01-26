import { UserRepository } from "src/infrastructure/repositories";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos";
import { IUser } from "../../entity/users.entity";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userData: CreateUserDto): Promise<IUser> {
        // Validate input
        if (!userData.email || !userData.password) {
            throw new BadRequestException("Email and password are required.");
        }

        // Check for existing user
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new BadRequestException("User with this email already exists.");
        }

        // Save the new user
        const user = await this.userRepository.create(userData);

        return user;
    }

    async findAll(): Promise<IUser[]> {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            throw new BadRequestException('Error fetching users');
        }
    }
    async findAllStaff(): Promise<IUser[]> {
        try {
            return await this.userRepository.findAllStaff();
        } catch (error) {
            throw new BadRequestException('Error fetching users');
        }
    }

    async signIn(email: string, password: string): Promise<IUser | null> {
        try {
            // Verify if the user exists
            const user = await this.userRepository.findByEmail(email);
            if (!user || user.password !== password) {
                throw new BadRequestException("Invalid credentials.");
            }
            return user;
        } catch (error) {
            throw new BadRequestException('Error signing in');
        }
    }
}
