import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../presentation/controllers/AuthController';
import { AuthGuard } from '../guards/AuthGuard';
import { APP_GUARD } from '@nestjs/core';
import { SignInUseCase } from '../../application/use-cases/auth/SignInUseCase';
import { UserRepository } from '../repositories/UserRepository';
import { jwtConstants } from '@config/constants';
import { JwtServiceWrapper } from '../services/JwtServiceWrapper';
import { UsersModule } from './Users.module';
import { SignOutUseCase } from '../../application/use-cases/auth/SignOutUseCase';
import { FirebaseModule } from '../database/firestore/firestore.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10d' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        JwtServiceWrapper,
        SignInUseCase,
        SignOutUseCase,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [JwtServiceWrapper, SignInUseCase, SignOutUseCase],
})
export class AuthModule { }
