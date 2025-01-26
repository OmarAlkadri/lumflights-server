import { EMaritalStatus, ERoles, } from '../../entity/users.entity';

export type CreateUserDto = {
    email: string;
    password: string;
    name: string;
    ERoles: ERoles[];
    EUserType: ERoles;
    createdAt: string
}

