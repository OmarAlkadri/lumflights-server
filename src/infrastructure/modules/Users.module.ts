import { Module } from '@nestjs/common';
import { UserController } from 'src/presentation/controllers';
import { UserRepository } from '../repositories';
import { CreateUserUseCase } from 'src/application/use-cases';
import { CreateUserHook } from '../hooks/create-user.hook';
import { FirebaseModule } from '../database/firestore/firestore.module';

@Module({
  imports: [FirebaseModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    CreateUserHook,
  ],
  exports: [UserRepository, CreateUserUseCase, CreateUserHook],
})
export class UsersModule { }
