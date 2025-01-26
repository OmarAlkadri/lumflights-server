import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { CreateUserDto } from '../../application/dtos/CreateUserDto';
import { IUser } from '../../entity/users.entity';
import { FirebaseRepository } from '../database/firestore/firestore.service';

@Injectable()
export class UserRepository {
    private readonly collection: Promise<FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>>;

    constructor(private readonly firebaseRepository: FirebaseRepository) {
        this.collection = this.firebaseRepository.getCollection('users'); // Firestore collection
    }
    async create(createUserDto: CreateUserDto): Promise<IUser> {
        try {
            const docRef = await (await this.collection).add(createUserDto);
            const doc = await docRef.get();
            return { id: doc.id, ...doc.data() } as unknown as IUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const snapshot = await (await this.collection).where('email', '==', email).get();
            if (snapshot.empty) {
                return null;
            }
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() } as unknown as IUser;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    async findById(userId: string): Promise<any> {
        const doc = await (await this.collection).doc(userId).get();
        if (!doc.exists) {
            throw new Error('User not found');
        }
        return { id: doc.id, ...doc.data() };
    }

    async findAll(): Promise<any[]> {
        const snapshot = await (await this.collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findAllStaff(): Promise<any[]> {
        const snapshot = await (await this.collection).where('EUserType', '==', 'staff').get();

        let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        data = data.map((item: any) => ({
            ...item,
            allERoles: item.ERoles.join(', ')
        }));
        return data;
    }

    async deleteById(id: string): Promise<void> {
        await (await this.collection).doc(id).delete();
    }

    async update(userId: string, updateData: Partial<IUser>): Promise<IUser> {
        try {
            const userDocRef = (await this.collection).doc(userId);

            const userDoc = await userDocRef.get();
            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            await userDocRef.update(updateData);

            const updatedUserDoc = await userDocRef.get();
            return { id: updatedUserDoc.id, ...updatedUserDoc.data() } as unknown as IUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}

