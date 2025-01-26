import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtServiceWrapper } from '../../../infrastructure/services/JwtServiceWrapper';
import { UserRepository } from '../../../infrastructure/repositories';

@Injectable()
export class SignOutUseCase {
    constructor(
        private readonly jwtServiceWrapper: JwtServiceWrapper,
        private readonly userRepository: UserRepository,
    ) { }

    async execute(token: string): Promise<{ message: string }> {
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const decodedToken = JwtServiceWrapper.decodeStatic(token, this.jwtServiceWrapper['jwtService']);
        if (!decodedToken) {
            throw new UnauthorizedException('Invalid token');
        }

        const username = decodedToken.username;
        const user = await this.userRepository.findByEmail(username);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        await this.userRepository.update(user.id, { isLoggedOut: true, updatedAt: new Date().toISOString() });

        return { message: 'Logged out successfully' };
    }
}
