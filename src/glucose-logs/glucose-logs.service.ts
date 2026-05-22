import { Injectable, Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GlucoseLogsService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async create(data: Prisma.GlucoseLogCreateInput) {
    if (!this.prisma) return null;
    return this.prisma.glucoseLog.create({
      data,
    });
  }

  async findAll(userId: string) {
    if (!this.prisma) return [];
    return this.prisma.glucoseLog.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
