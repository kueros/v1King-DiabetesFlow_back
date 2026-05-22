import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MealsService } from './meals.service';
import { Prisma } from '@prisma/client';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  async create(
    @Body()
    body: {
      userId: string;
      items: { foodId: string; quantityG: number }[];
    },
  ) {
    return this.mealsService.create(body.userId, body.items);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.mealsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mealsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.MealUpdateInput) {
    return this.mealsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mealsService.remove(id);
  }
}
