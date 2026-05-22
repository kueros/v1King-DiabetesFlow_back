import { Controller, Post, Get, Body, Param, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GlucoseLogsService } from './glucose-logs.service';

@Controller('glucose-logs')
export class GlucoseLogsController {
  constructor(@Optional() private readonly glucoseLogsService?: GlucoseLogsService) {}

  @Post()
  async create(@Body() data: Prisma.GlucoseLogCreateInput) {
    if (!this.glucoseLogsService) return null;
    return this.glucoseLogsService.create(data);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    if (!this.glucoseLogsService) return [];
    return this.glucoseLogsService.findAll(userId);
  }
}
