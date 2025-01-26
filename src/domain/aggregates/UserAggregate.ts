// AggregateRootName.ts
import { IUser, } from 'src/entity/users.entity';
import { Email } from '../value-objects/Email';

export class UserAggregate {
    private readonly user: IUser;
    private readonly email: Email;

    constructor(user: IUser, email: Email) {
        this.user = user;
        this.email = email;
    }

    getUser(): IUser {
        return this.user;
    }

    getEmail(): Email {
        return this.email;
    }
}
