import { Controller, Post, Body, Optional } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(
    @Optional() private readonly calculatorService?: CalculatorService,
  ) {}

  @Post('bolus')
  async calculateBolus(
    @Body() body: { userId: string; currentGlucose: number; carbs: number },
  ) {
    if (!this.calculatorService) return null;
    return this.calculatorService.calculateBolus(
      body.userId,
      body.currentGlucose,
      body.carbs,
    );
  }
}
