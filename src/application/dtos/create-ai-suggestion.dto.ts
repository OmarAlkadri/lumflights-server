// create-ai-suggestion.dto.ts
import { IsString, IsInt, Min, IsDate } from 'class-validator';

export class CreateAISuggestionDto {
    @IsString()
    userId: string;

    @IsString()
    flightId: string;

    @IsInt()
    @Min(1)
    suggestedSeats: number;

    @IsString()
    reason: string;

    @IsDate()
    createdAt: Date;
}
