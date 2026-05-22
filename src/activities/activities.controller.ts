import { Controller, Get, Post, Body, Param, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(
    @Optional() private readonly activitiesService?: ActivitiesService,
  ) {}

  @Post()
  async create(@Body() data: Prisma.ActivityCreateInput) {
    if (!this.activitiesService) return null;
    return this.activitiesService.create(data);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    if (!this.activitiesService) return [];
    return this.activitiesService.findAll(userId);
  }
}
