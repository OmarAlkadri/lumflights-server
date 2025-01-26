import { Module } from '@nestjs/common';

import { FirebaseModule } from '../database/firestore/firestore.module';
import { ReservationController } from '../../presentation/controllers/ReservationController';
import { CreateReservationUseCase } from '../../application/use-cases/ReservationUseCase';
import { ReservationRepository } from '../repositories/ReservationRepository';
import { AIService } from '../services/ai.service';
import { UserRepository } from '../repositories';

@Module({
    imports: [FirebaseModule],
    controllers: [ReservationController],
    providers: [UserRepository, ReservationRepository, CreateReservationUseCase, AIService],
    exports: [UserRepository, ReservationRepository, CreateReservationUseCase],
})
export class ReservationsModule { }
