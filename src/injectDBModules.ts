import { Module } from '@nestjs/common';
import { SeedDataService } from './infrastructure/database/seed-data';
import { AISuggestionsModule, AuthModule, ReservationsModule, UsersModule } from './infrastructure/modules';

@Module({
    imports: [
        AuthModule,
        ReservationsModule,
        AISuggestionsModule,
        UsersModule
    ],
    providers: [SeedDataService]
})
export class injectDBModules { }
