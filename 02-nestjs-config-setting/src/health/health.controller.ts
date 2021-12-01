import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { AppConfigService } from 'src/config/app/config.service';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: AppConfigService,
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,

    @InjectConnection()
    private databaseConnection: Connection,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    try {
      const dbConnectResult = await this.health.check([
        () =>
          this.database.pingCheck('mysql', {
            connection: this.databaseConnection,
          }),
      ]);

      return {
        status: 'Success',
        app_name: this.configService.name,
        app_version: 'app_version',
        app_env: this.configService.env,
        current_date: new Date().toLocaleString(),
        database_connect_result: dbConnectResult,
      };
    } catch (error) {
      return {
        status: 'Fail',
        message: 'error: ' + error,
        app_name: this.configService.name,
        app_version: 'app_version',
        app_env: this.configService.env,
        current_date: new Date().toLocaleString(),
      };
    }
  }
}
