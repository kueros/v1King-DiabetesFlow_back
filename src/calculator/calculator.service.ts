import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalculatorService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async calculateIOB(userId: string): Promise<number> {
    if (!this.prisma) return 0;

    const DIA_MINUTES = 240;
    const nowTime = Date.now();
    const fourHoursAgo = new Date(nowTime - DIA_MINUTES * 60 * 1000);

    const logs = await this.prisma.insulinLog.findMany({
      where: {
        userId,
        type: 'Rápida',
        timestamp: {
          gte: fourHoursAgo,
        },
      },
    });

    let totalIOB = 0;

    for (const log of logs) {
      const units = Number(log.units);
      const logTime = new Date(log.timestamp).getTime();
      const minutesElapsed = (nowTime - logTime) / (1000 * 60);

      if (minutesElapsed >= 0 && minutesElapsed < DIA_MINUTES) {
        totalIOB += units * (1 - (minutesElapsed / DIA_MINUTES));
      }
    }

    return totalIOB;
  }

  async calculateBolus(
    userId: string,
    currentGlucose: number,
    carbs: number,
  ): Promise<number> {
    if (!this.prisma) return 0;

    const settings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) throw new Error('UserSettings not found');

    const ratio = await this.prisma.userRatio.findFirst({
      where: { userId },
    });

    if (!ratio) throw new Error('UserRatio not found');

    const iob = await this.calculateIOB(userId);

    const isf = Number(settings.isf);
    const targetMin = settings.targetMin;
    const icr = Number(ratio.icr);

    const carbDose = carbs / icr;
    const correctionDose = (currentGlucose - targetMin) / isf;
    const totalBolus = carbDose + correctionDose - iob;

    return Math.max(0, totalBolus);
  }
}

