import { Module } from '@nestjs/common';
import { GlucoseLogsService } from './glucose-logs.service';
import { GlucoseLogsController } from './glucose-logs.controller';

@Module({
  providers: [GlucoseLogsService],
  controllers: [GlucoseLogsController]
})
export class GlucoseLogsModule {}
