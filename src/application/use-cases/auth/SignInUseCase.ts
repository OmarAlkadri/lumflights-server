import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories';
import { JwtServiceWrapper } from '../../../infrastructure/services/JwtServiceWrapper';
import { IUser } from 'src/entity/users.entity';

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtServiceWrapper,
    ) { }

    async execute(email: string, password: string): Promise<{ access_token: string, user: IUser }> {
        const user = await this.userRepository.findByEmail(email);

        await this.userRepository.update(user.id, { isLoggedOut: false, updatedAt: new Date().toISOString() });

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.email, sub: user.id };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken, user: user };
    }
}

