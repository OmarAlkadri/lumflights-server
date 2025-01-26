import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { ReservationRepository } from '../repositories/ReservationRepository';
import { IReservations } from 'src/entity/reservations.entity';
import { CreateUserDto } from 'src/application/dtos';
import { faker } from '@faker-js/faker';
import { IComments } from 'src/application/interfaces/comment.interface';
import { ERoles } from 'src/entity/users.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class SeedDataService implements OnModuleInit {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly reservationRepository: ReservationRepository,
    ) { }

    async onModuleInit() {
        await this.seedUsers();
        await this.seedReservations();
    }

    private async seedUsers() {
        const existingUsers = await this.userRepository.findAll();
        if (existingUsers.length > 10) {
            console.log('Users collection already contains data. Skipping seeding.');
            return;
        }
        console.log('Users collection seeded start.');
        const availableRoles = Object.values(ERoles);
        const users: CreateUserDto[] = [
            {
                email: "admin@example.com",
                password: "admin123",
                name: "Admin User",
                ERoles: [
                    ERoles.Admin,
                    ERoles.Manager,
                    ERoles.Field,
                    ERoles.Employee,
                    ERoles.Supervisor,
                ],
                EUserType: ERoles.Admin,
                createdAt: new Date().toISOString()
            },
            ...Array.from({ length: 9 }, () => {
                const roles = [ERoles.Field];

                const additionalRolesCount = faker.number.int({ min: 1, max: 3 });
                for (let i = 0; i < additionalRolesCount; i++) {
                    const randomRole = faker.helpers.arrayElement(availableRoles);
                    if (!roles.includes(randomRole) && randomRole == ERoles.Admin) {
                        roles.push(randomRole);
                    }
                }

                return {
                    email: faker.internet.email(),
                    password: "password123",
                    name: faker.person.fullName(),
                    ERoles: roles,
                    EUserType: ERoles.Field,
                    createdAt: new Date().toISOString()
                };
            }),
        ];
        const batch = admin.firestore().batch();
        for (const user of users) {
            const userRef = admin.firestore().collection('users').doc();
            batch.set(userRef, user);
        }

        await batch.commit();
        console.log('Users collection seeded successfully.');
    }

    private async seedReservations() {
        const existingReservations = await this.reservationRepository.findAll();
        if (existingReservations.length > 1000) {
            console.log('Reservations collection already contains data. Skipping seeding.');
            return;
        }
        console.log('Reservations collection seeded start.');

        const bookings: IReservations[] = Array.from({ length: 1000 - existingReservations.length }, () => {

            const numCustomers = faker.number.int({ min: 1, max: 3 });
            const customers = Array.from({ length: numCustomers }, () => ({
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                createdAt: new Date().toISOString()
            }));

            const flightId = `FL-${faker.number.int({ min: 1000, max: 9999 })}`;
            const comments: IComments[] = Array.from({ length: numCustomers }).map(() => ({
                id: faker.string.uuid(),
                text: faker.lorem.sentence(),
                createdAt: faker.date.recent(),
                rating: faker.number.int({ min: 0, max: 5 }),
                userId: faker.string.uuid(),
                flightId,
            }));

            let fromWhereLocation = faker.location.city();
            let toWhereLocation;

            do {
                toWhereLocation = faker.location.city();
            } while (toWhereLocation === fromWhereLocation);

            const flightCompaniName = faker.company.name();
            const statusOptions = ['confirmed', 'pending', 'cancelled'];
            const status = statusOptions[faker.number.int({ min: 0, max: statusOptions.length - 1 })];
            const data = {
                id: faker.string.uuid(),
                userId: faker.string.uuid(),
                flightId,
                fromWhereLocation,
                toWhereLocation,
                flightCompaniName,
                flightNumber: `FL-${faker.number.int({ min: 1000, max: 9999 })}`,
                date: new Date(Date.now() - faker.number.int({ min: 0, max: 365 }) * 24 * 60 * 60 * 1000).toISOString(),
                reservationDate: new Date().toISOString(),
                customers,
                comments,
                seatsBooked: customers.length,
                status,
                createdAt: new Date().toISOString()
            }
            return data as unknown as IReservations;
        });

        const batch = admin.firestore().batch();

        bookings.forEach(booking => {
            const bookingRef = admin.firestore().collection('reservations').doc();
            batch.set(bookingRef, booking);
        });

        await batch.commit();
        console.log('Reservations collection seeded successfully.');
    }
}
