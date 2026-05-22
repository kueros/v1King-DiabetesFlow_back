import { Controller, Get, Post, Body, Param, Optional } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(@Optional() private readonly mealsService?: MealsService) {}

  @Post()
  async create(
    @Body()
    body: {
      userId: string;
      items: { foodId: string; quantityG: number }[];
    },
  ) {
    if (!this.mealsService) return null;
    return this.mealsService.create(body.userId, body.items);
  }

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    if (!this.mealsService) return [];
    return this.mealsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!this.mealsService) return null;
    return this.mealsService.findOne(id);
  }
}
