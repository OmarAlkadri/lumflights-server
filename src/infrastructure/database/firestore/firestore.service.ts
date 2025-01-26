// firestore/firestore.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
    #db: FirebaseFirestore.Firestore;
    #collection: FirebaseFirestore.CollectionReference;

    constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
        this.#db = firebaseApp.firestore();
        //        this.#collection = this.#db.collection('<collection_name>');
    }


    async getCollection(collection: string): Promise<FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        return this.#db.collection(collection);;
    }
    async addDocument(collection: string, data: Record<string, any>) {
        const docRef = this.#db.collection(collection).doc();
        await docRef.set(data);
        return docRef.id;
    }

    async getDocument(collection: string, id?: string) {
        const docRef = this.#db.collection(collection).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error('Document not found');
        }
        return doc.data();
    }

    async updateDocument(collection: string, id: string, data: Record<string, any>) {
        const docRef = this.#db.collection(collection).doc(id);
        await docRef.update(data);
    }

    async deleteDocument(collection: string, id: string) {
        const docRef = this.#db.collection(collection).doc(id);
        await docRef.delete();
    }
}
