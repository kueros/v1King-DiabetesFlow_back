import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { Prisma } from '@prisma/client';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  async findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.FoodCreateInput) {
    return this.foodsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.FoodUpdateInput) {
    return this.foodsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
