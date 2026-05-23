import { Injectable } from '@nestjs/common';
import { Prisma, Activity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ActivityCreateInput): Promise<Activity> {
    return this.prisma.activity.create({ data });
  }

  async findAll(userId: string): Promise<Activity[]> {
    return this.prisma.activity.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async findOne(id: string): Promise<Activity | null> {
    return this.prisma.activity.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ActivityUpdateInput): Promise<Activity> {
    return this.prisma.activity.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Activity> {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
