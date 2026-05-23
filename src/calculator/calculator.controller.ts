import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  calculateBolus(
    @Body('currentGlucose') currentGlucose: number,
    @Body('targetCarbs') targetCarbs: number,
  ) {
    return this.calculatorService.calculateBolus(Number(currentGlucose), Number(targetCarbs));
  }
}
