import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Meal, Prisma } from '@prisma/client';

@Injectable()
export class MealsService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async create(userId: string, items: { foodId: string; quantityG: number }[]): Promise<Meal | null> {
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

  async findAll(userId: string): Promise<Meal[]> {
    if (!this.prisma) return [];
    return this.prisma.meal.findMany({
      where: { userId },
      include: { items: { include: { food: true } } },
      orderBy: { timestamp: 'desc' },
    });
  }

  async findOne(id: string): Promise<Meal | null> {
    if (!this.prisma) return null;
    return this.prisma.meal.findUnique({
      where: { id },
      include: { items: { include: { food: true } } },
    });
  }

  async update(id: string, data: Prisma.MealUpdateInput): Promise<Meal | null> {
    if (!this.prisma) return null;
    return this.prisma.meal.update({
      where: { id },
      data,
      include: { items: { include: { food: true } } },
    });
  }

  async remove(id: string): Promise<Meal | null> {
    if (!this.prisma) return null;
    return this.prisma.meal.delete({
      where: { id },
    });
  }
}
