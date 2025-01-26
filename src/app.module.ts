import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from '@config/server.config';
import databaseConfig from '@config/database.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { injectDBModules } from './injectDBModules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/development.env',
      load: [serverConfig, databaseConfig],
      cache: true,
    }),
    injectDBModules
  ],
  providers: [AppService,],
  exports: [],
  controllers: [AppController],
})
export class AppModule { }
