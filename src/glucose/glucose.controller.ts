import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { GlucoseService } from './glucose.service';

@Controller('glucose')
export class GlucoseController {
  constructor(private readonly glucoseService: GlucoseService) {}

  @Post()
  async create(
    @Body() body: { userId: string; glucose: number; context: string },
  ) {
    return this.glucoseService.create(body.userId, Number(body.glucose), body.context);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.glucoseService.findAll(userId);
  }
}
