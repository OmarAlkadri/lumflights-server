import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../database/firestore/firestore.service';
import { IReservations } from '../../entity/reservations.entity';

@Injectable()
export class ReservationRepository {
    private readonly collection: Promise<FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>>;

    constructor(private readonly firebaseRepository: FirebaseRepository) {
        this.collection = this.firebaseRepository.getCollection('reservations');
    }

    async findAllPaginated(page: number, limit: number): Promise<{ data: IReservations[]; total: number }> {
        const offset = (page - 1) * limit;

        const snapshot = await (
            await this.collection
        ).orderBy('date', 'desc')
            .offset(offset)
            .limit(limit)
            .get();

        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IReservations[];

        const total = (await (await this.collection).get()).size;

        return { data, total };
    }


    async searchByDateRange(startDate: Date, endDate: Date, page: number, limit: number): Promise<{ data: IReservations[]; total: number }> {
        const snapshot = await (
            await this.collection
        )
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .orderBy('date', 'desc')
            .offset((page - 1) * limit)
            .limit(limit)
            .get();

        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IReservations[];
        const total = (await (
            await this.collection
        )
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .get()).size;

        return { data, total };
    }


    async create(reservation: IReservations): Promise<IReservations> {
        const docRef = await (await this.collection).add(reservation);
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() } as IReservations;
    }

    async findByUserId(userId: string): Promise<IReservations[]> {
        const snapshot = await (await this.collection).where('userId', '==', userId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IReservations[];
    }

    async findAll(): Promise<IReservations[]> {
        const snapshot = await (await this.collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IReservations[];
    }

    async deleteById(id: string): Promise<void> {
        await (await this.collection).doc(id).delete();
    }

    async getReservationById(id: string): Promise<IReservations | null> {
        try {
            const querySnapshot = await (await this.collection).where("id", "==", id).get();

            // If no documents are found
            if (querySnapshot.empty) {
                console.error(`Reservation not found for ID: ${id}`);
                return null;
            }

            // Assuming only one document matches the query
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as IReservations;
        } catch (error) {
            console.error(`Error retrieving reservation with ID: ${id}`, error);
            throw new Error('Error retrieving reservation');
        }
    }


}
