import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.APP_ENV === 'local' || process.env.APP_ENV === undefined
          ? '.env'
          : `${process.env.APP_ENV}.env`,
      load: [configuration],
      validationSchema: Joi.object({
        // APP_ENV: Joi.string().valid('dev', 'prod', 'test', 'local'),
        APP_NAME: Joi.string().default('MyApp'),
        APP_URL: Joi.string().default('http://localhost'),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
