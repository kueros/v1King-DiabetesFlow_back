import { Injectable, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodsService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async create(data: Prisma.FoodCreateInput) {
    if (!this.prisma) return null;
    return this.prisma.food.create({ data });
  }

  async findAll() {
    if (!this.prisma) return [];
    return this.prisma.food.findMany();
  }

  async findOne(id: string) {
    if (!this.prisma) return null;
    return this.prisma.food.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.FoodUpdateInput) {
    if (!this.prisma) return null;
    return this.prisma.food.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    if (!this.prisma) return null;
    return this.prisma.food.delete({ where: { id } });
  }
}
