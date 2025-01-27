import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from '@config/server.config';
import databaseConfig from '@config/database.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { injectDBModules } from './injectDBModules';


const getEnvFilePath = () => {
  const environment = process.env.NODE_ENV || 'development';
  return environment === 'production' ? './env/production.env' : './env/development.env';
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      load: [serverConfig, databaseConfig],
      isGlobal: true,
      cache: true,
    }),
    injectDBModules
  ],
  providers: [AppService,],
  exports: [],
  controllers: [AppController],
})
export class AppModule { }
