// ControllerName.ts

import { Body, Controller, Get, Post, Req, Res, HttpCode, Header, HttpStatus, Redirect, Query, Param } from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/CreateUserDto';
import { CreateUserUseCase } from '../../application/use-cases/UserUseCase';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Get('all')
    async findAll(@Res() res: any): Promise<void> {
        try {
            const result = await this.createUserUseCase.findAll();
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
        }
    }
    @Get('allStaff')
    async findAllStaff(@Res() res: any): Promise<void> {
        try {
            const result = await this.createUserUseCase.findAllStaff();
            res.status(HttpStatus.OK).send(result);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
        }
    }

    //@Get(':username?')
    @Post('signIn')
    async signIn(@Res({ passthrough: true }) res: any, @Body() data: { email: string, password: string }): Promise<any> {
        try {
            const result = await this.createUserUseCase.signIn(data.email, data.password);
            if (result) {
                res.status(HttpStatus.OK).send(result);
                return result;
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.BAD_REQUEST).send({ error: error });
        }
    }

    @Public()
    @Post('add')
    // @Header('Cache-Control', 'none')
    // @HttpCode(204)
    //@Redirect('https://nestjs.com', 302)
    async create(@Res() res: any, @Body() data: CreateUserDto): Promise<void> {
        try {
            const result = await this.createUserUseCase.execute(data);
            res.status(HttpStatus.CREATED).send(result);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
        }
    }
}