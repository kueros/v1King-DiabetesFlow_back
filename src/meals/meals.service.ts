import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MealsService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async create(userId: string, items: { foodId: string; quantityG: number }[]) {
    if (!this.prisma) return null;

    return this.prisma.$transaction(async (tx) => {
      let totalCarbs = 0;

      for (const item of items) {
        const food = await tx.food.findUnique({
          where: { id: item.foodId },
        });

        if (!food) {
          throw new Error(`Food with ID ${item.foodId} not found`);
        }

        const carbsPer100g = Number(food.carbsPer100g);
        const itemCarbs = (item.quantityG / 100) * carbsPer100g;
        totalCarbs += itemCarbs;
      }

      const meal = await tx.meal.create({
        data: {
          userId,
          totalCarbs,
          items: {
            create: items.map((item) => ({
              foodId: item.foodId,
              quantityG: item.quantityG,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return meal;
    });
  }

  async findAll(userId: string) {
    if (!this.prisma) return [];
    return this.prisma.meal.findMany({
      where: { userId },
      include: { items: { include: { food: true } } },
      orderBy: { timestamp: 'desc' },
    });
  }

  async findOne(id: string) {
    if (!this.prisma) return null;
    return this.prisma.meal.findUnique({
      where: { id },
      include: { items: { include: { food: true } } },
    });
  }
}
