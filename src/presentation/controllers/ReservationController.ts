import { Controller, Post, Get, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { CreateReservationDto } from '../../application/dtos/create-reservation.dto';
import { CreateReservationUseCase } from '../../application/use-cases/ReservationUseCase';
import { ReservationRepository } from '../../infrastructure/repositories/ReservationRepository';
import { Public } from '../decorators/public.decorator';
import { AIService } from 'src/infrastructure/services/ai.service';
import { IReservations } from 'src/entity/reservations.entity';

@Controller('reservations')
export class ReservationController {
    constructor(
        private readonly createReservationUseCase: CreateReservationUseCase,
        private readonly reservationRepository: ReservationRepository,
        private readonly aiService: AIService
    ) { }

    @Get()
    async getAggregatedReservations(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
        @Res() res: any,
    ): Promise<void> {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);

            const result = await this.aggregateReservations(pageNum, limitNum);

            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    private async aggregateReservations(page: number, limit: number): Promise<{ data: any[]; total: number }> {
        const { data: reservations, total } = await this.reservationRepository.findAllPaginated(page, limit);

        const aggregatedData = await Promise.all(
            reservations.map(async (reservation) => {
                let customerNames = '';
                let commentsText = '';
                let customerEmails = '';

                reservation.customers.forEach((customer: { name?: string; email?: string }) => {
                    if (customer.name) customerNames += `${customer.name}, `;
                    if (customer.email) customerEmails += `${customer.email}, `;
                });

                reservation.comments.forEach((comment: any) => {
                    if (comment.text) commentsText += `${comment.text}, `;
                });

                return {
                    ...reservation,
                    customerNames: customerNames.trimEnd().replace(/,$/, ''),
                    customerEmails: customerEmails.trimEnd().replace(/,$/, ''),
                    commentsText: commentsText.trimEnd().replace(/,$/, '')
                };
            }),
        );

        return { data: aggregatedData, total };
    }

    @Get('search')
    async searchReservationsByDate(
        @Res() res: any,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<void> {
        try {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);

            let result;

            if (startDate && endDate) {
                // البحث بناءً على النطاق الزمني
                result = await this.reservationRepository.searchByDateRange(
                    new Date(startDate),
                    new Date(endDate),
                    pageNum,
                    limitNum
                );
            } else {
                result = await this.reservationRepository.findAllPaginated(pageNum, limitNum);
            }

            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }



    @Get('aggregated')
    async findAllWithUsers(@Res() res: any): Promise<void> {
        try {
            const result = await this.createReservationUseCase.findAllWithUsers();
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    @Get('user/:userId/aggregated')
    async findByUserIdWithReservations(@Param('userId') userId: string, @Res() res: any): Promise<void> {
        try {
            const result = await this.createReservationUseCase.findByUserIdWithReservations(userId);
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    @Post('add')
    async create(@Res() res: any, @Body() data: CreateReservationDto): Promise<void> {
        try {
            const result = await this.createReservationUseCase.createReservation(data);
            res.status(HttpStatus.CREATED).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    @Get('all')
    async findAll(@Res() res: any): Promise<void> {
        try {
            const result = await this.reservationRepository.findAll();
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }
    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: any): Promise<void> {
        try {
            const result = await this.reservationRepository.getReservationById(id);
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string, @Res() res: any): Promise<void> {
        try {
            const result = await this.reservationRepository.findByUserId(userId);
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
            }
        }
    }

    @Public()
    @Post('suggestion/:reservationId')
    async getReservationSuggestionai(@Param('reservationId') reservationId: string, @Res() res: any) {
        if (!reservationId) {
            throw new Error('Invalid reservation data.');
        }

        const reservation = await this.reservationRepository.getReservationById(reservationId);
        if (!reservation) {
            throw new Error('Reservation not found.');
        }

        const transformedComments = reservation.comments?.map((comment: any) => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            userId: comment.userId,
            flightId: comment.flightId,
        })) || [];

        const suggestion = await this.aiService.generateSuggestion({
            ...reservation,
            comments: transformedComments,
        });
        res.status(HttpStatus.OK).send(suggestion);
    }



    @Get(':id/suggestion')
    async getReservationSuggestion(@Param('id') id: string) {
        const reservationData = { date: '2025-01-26', clientCount: 2 };
        const suggestion = await this.aiService.generateSuggestion(reservationData);
        return suggestion;
    }
}
