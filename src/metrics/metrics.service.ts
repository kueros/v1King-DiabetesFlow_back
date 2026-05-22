import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(@Optional() private prisma?: PrismaService) {}

  async calculateTIR(userId: string, startDate: Date, endDate: Date) {
    if (!this.prisma) {
      return { tirPercentage: 0, totalLogs: 0, inRangeLogs: 0 };
    }

    const settings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      throw new Error('UserSettings not found');
    }

    const logs = await this.prisma.glucoseLog.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalLogs = logs.length;

    if (totalLogs === 0) {
      return { tirPercentage: 0, totalLogs: 0, inRangeLogs: 0 };
    }

    const targetMin = settings.targetMin;
    const targetMax = settings.targetMax;

    let inRangeLogs = 0;

    for (const log of logs) {
      if (log.level >= targetMin && log.level <= targetMax) {
        inRangeLogs++;
      }
    }

    const tirPercentage = (inRangeLogs / totalLogs) * 100;

    return { tirPercentage, totalLogs, inRangeLogs };
  }

  async exportGlucoseLogsCSV(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<string> {
    if (!this.prisma) return '';

    const logs = await this.prisma.glucoseLog.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    let csv = 'Fecha,Glucemia(mg/dL),Contexto\n';

    for (const log of logs) {
      csv += `${log.timestamp.toISOString()},${log.level},${log.context}\n`;
    }

    return csv;
  }
}

