/* eslint-disable prettier/prettier */
//import { Injectable, DynamicModule } from "@nestjs/common";
//import { ConfigService } from '@nestjs/config';
//import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
//
//
//interface EnvironmentVariables {
//    MONGODB_HOST: string,
//    MONGODB_PORT: number,
//    MONGODB_DB_Name: string
//}
//@Injectable()
//export class TypeOrmConfigService implements TypeOrmOptionsFactory {
//
//    private readonly config: ConfigService<EnvironmentVariables>;
//    private readonly connection!: DynamicModule;
//
//    constructor(private configService: ConfigService<EnvironmentVariables>) {
//        this.config = this.configService;
//    }
//    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
//        const host = this.configService.get<string>('MONGODB_HOST');
//        const port = this.configService.get<number>('MONGODB_PORT');
//        const name = this.configService.get<number>('MONGODB_DB_Name');
//
//        const url = `mongodb://${host}:${port}/${name}`;
//        return {
//            type: 'mongodb',
//            host: host,
//            port: port,
//            //   database: this.configService.get<string>('DB_NAME'),
//            // username: this.configService.get<string>('DB_USER'),
//            //  password: this.configService.get<string>('DB_PASS'),
//            //  url: url,
//            //entities: ['./dist/**/*.entity.js'],
//            entities: [__dirname + '/../**/*.entity{.ts'],
//            synchronize: true, // يفضل تعطيلها في بيئة الإنتاج
//            useUnifiedTopology: true,
//
//        }
//
//    }
//}
//