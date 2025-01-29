// create-reservation.dto.ts
import { IsDate, IsInt, Min, Max, IsEnum, IsArray } from 'class-validator';
import { IUser } from 'src/entity/users.entity';

export class CreateReservationDto {
    @IsInt()
    @Min(1)
    @Max(10)
    seatsBooked!: number;

    @IsDate()
    reservationDate!: Date;

    @IsEnum(['pending', 'confirmed', 'canceled'])
    status: 'pending' | 'confirmed' | 'canceled' = "pending";

    @IsArray()
    customers: IUser[] | undefined;

    @IsArray()
    comments: Comment[] | undefined;
}

