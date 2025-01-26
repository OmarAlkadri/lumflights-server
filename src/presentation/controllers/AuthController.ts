import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/auth/SignInUseCase';
import { Public } from '../decorators/public.decorator';
import { SignOutUseCase } from '../../application/use-cases/auth/SignOutUseCase';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly signOutUseCase: SignOutUseCase,
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any> /* SignInDto */) {
        return this.signInUseCase.execute(signInDto.email, signInDto.password);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logOut(@Request() req: any) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.signOutUseCase.execute(token);
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
