import { IUser } from "./users.entity";

// reservation.entity.ts
export interface IReservations {
  id?: string;
  customers: IUser[];
  seatsBooked: number;
  reservationDate: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  comments: Comment[];
}