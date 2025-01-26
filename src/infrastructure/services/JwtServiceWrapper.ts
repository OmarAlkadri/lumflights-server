import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceWrapper {

    constructor(private readonly jwtService: JwtService) { }

    signAsync(payload: any, options?: any): Promise<string> {
        return this.jwtService.signAsync(payload, options);
    }

    verifyAsync(token: string, options?: any): Promise<any> {
        return this.jwtService.verifyAsync(token, options);
    }

    decode(token: string): any {
        return this.jwtService.decode(token);
    }

    static decodeStatic(token: string, jwtService: JwtService): any {
        return jwtService.decode(token);
    }
}
