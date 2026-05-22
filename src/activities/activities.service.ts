import { Injectable, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async create(data: Prisma.ActivityCreateInput) {
    if (!this.prisma) return null;
    return this.prisma.activity.create({ data });
  }

  async findAll(userId: string) {
    if (!this.prisma) return [];
    return this.prisma.activity.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
