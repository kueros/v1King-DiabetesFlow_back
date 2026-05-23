import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async create(@Body() data: Prisma.ActivityCreateInput) {
    return this.activitiesService.create(data);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.activitiesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.ActivityUpdateInput) {
    return this.activitiesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
