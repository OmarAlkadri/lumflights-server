import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../presentation/decorators/public.decorator';
import { JwtServiceWrapper } from '../services/JwtServiceWrapper';
import { UserRepository } from '../repositories';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtServiceWrapper,
        private readonly reflector: Reflector,
        private readonly userRepository: UserRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);

            request.user = payload;
            const user = await this.userRepository.findByEmail(payload.username); // البحث عن المستخدم بواسطة البريد الإلكتروني.
            if (!user || user.isLoggedOut) {
                throw new UnauthorizedException('User has logged out');
            }
        } catch {
            throw new UnauthorizedException('Invalid token');
        }


        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return undefined;
        }

        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
