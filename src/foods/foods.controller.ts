import { Controller, Get, Post, Body, Patch, Param, Delete, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(@Optional() private readonly foodsService?: FoodsService) {}

  @Post()
  async create(@Body() data: Prisma.FoodCreateInput) {
    if (!this.foodsService) return null;
    return this.foodsService.create(data);
  }

  @Get()
  async findAll() {
    if (!this.foodsService) return [];
    return this.foodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!this.foodsService) return null;
    return this.foodsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.FoodUpdateInput,
  ) {
    if (!this.foodsService) return null;
    return this.foodsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!this.foodsService) return null;
    return this.foodsService.remove(id);
  }
}
