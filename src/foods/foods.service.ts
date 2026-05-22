import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Food } from '@prisma/client';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.FoodCreateInput): Promise<Food> {
    return this.prisma.food.create({ data });
  }

  async findAll(): Promise<Food[]> {
    return this.prisma.food.findMany();
  }

  async findOne(id: string): Promise<Food | null> {
    return this.prisma.food.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.FoodUpdateInput): Promise<Food> {
    return this.prisma.food.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Food> {
    return this.prisma.food.delete({
      where: { id },
    });
  }
}
