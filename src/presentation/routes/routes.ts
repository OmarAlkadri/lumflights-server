// RouteName.ts
import { RouterModule, RouteTree } from '@nestjs/core';
import { UsersModule } from '../../infrastructure/modules/Users.module';
import { AuthModule } from 'src/infrastructure/modules/Auth.module';

export const routes: RouteTree[] = [
    { path: '/users', module: UsersModule },
    { path: '/auth', module: AuthModule },
];
