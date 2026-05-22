import { Controller, Get, Param, Query, Optional, Res } from '@nestjs/common';
import type { Response } from 'express';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(@Optional() private readonly metricsService?: MetricsService) {}

  @Get('tir/:userId')
  async getTIR(
    @Param('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!this.metricsService) return null;
    return this.metricsService.calculateTIR(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('export/csv/:userId')
  async exportCSV(
    @Param('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Res() res: Response,
  ) {
    if (!this.metricsService) {
      return res.status(500).send('');
    }
    const csvData = await this.metricsService.exportGlucoseLogsCSV(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="diabetesflow_export.csv"');
    return res.status(200).send(csvData);
  }
}

