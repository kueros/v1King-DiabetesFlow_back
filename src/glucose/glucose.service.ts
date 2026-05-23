import { Injectable } from '@nestjs/common';
import { Prisma, GlucoseLog } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GlucoseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, valor: number, type: string): Promise<GlucoseLog> {
    const numericLevel = Number(valor);
    if (isNaN(numericLevel)) {
      throw new Error('El valor de glucemia debe ser un número válido');
    }

    return this.prisma.glucoseLog.create({
      data: {
        userId,
        level: numericLevel,
        context: type,
        timestamp: new Date(),
      },
    });
  }

  async findAll(userId: string): Promise<GlucoseLog[]> {
    return this.prisma.glucoseLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
