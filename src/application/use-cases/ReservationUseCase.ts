import { Injectable, BadRequestException } from '@nestjs/common';
import { IReservations } from '../../entity/reservations.entity';
import { ReservationRepository } from '../../infrastructure/repositories/ReservationRepository';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { UserRepository } from 'src/infrastructure/repositories';

@Injectable()
export class CreateReservationUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async createReservation(reservationData: CreateReservationDto): Promise<IReservations> {
        return await this.reservationRepository.create(reservationData);
    }

    async findAllReservations(): Promise<IReservations[]> {
        return await this.reservationRepository.findAll();
    }

    async findReservationsByUserId(userId: string): Promise<IReservations[]> {
        return await this.reservationRepository.findByUserId(userId);
    }



    async findAllWithUsers(): Promise<any[]> {
        const reservations = await this.reservationRepository.findAll();
        const aggregatedData = await Promise.all(
            reservations.map(async (reservation) => {
                let customerNames;
                let customerEmails;

                reservation.customers.forEach(customer => {
                    if (customer.name)
                        customerNames += `${customer.name} ,`
                    if (customer.email)
                        customerEmails += `${customer.email} ,`

                })
                return {
                    ...reservation,
                    customerNames,
                    customerEmails
                };
            })
        );
        return aggregatedData;
    }

    async findByUserIdWithReservations(userId: string): Promise<any> {
        const user = await this.userRepository.findById(userId);
        const reservations = await this.reservationRepository.findByUserId(userId);

        return { user, reservations };
    }
}
