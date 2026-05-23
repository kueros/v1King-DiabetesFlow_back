import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(userId: string) {
    return this.prisma.settings.findUnique({ where: { userId } });
  }

async upsertSettings(userId: string, data: any) {
    return this.prisma.settings.upsert({
      where: { userId },
      update: {
        insulinSensitivity: data.insulinSensitivity,
        carbRatio: data.carbRatio,
        targetGlucose: data.targetGlucose,
      },
      create: {
        userId,
        insulinSensitivity: data.insulinSensitivity ?? 50,
        carbRatio: data.carbRatio ?? 15,
        targetGlucose: data.targetGlucose ?? 100,
      },
    });
  }
}
