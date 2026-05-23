import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculateBolus(currentGlucose: number, targetCarbs: number): { bolus: number } {
    const correction = Math.max(0, (currentGlucose - 100) / 50);
    const meal = targetCarbs / 15;
    return { bolus: Number((correction + meal).toFixed(2)) };
  }
}

