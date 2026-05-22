import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GlucoseLogsModule } from './glucose-logs/glucose-logs.module';
import { FoodsModule } from './foods/foods.module';
import { MealsModule } from './meals/meals.module';
import { ActivitiesModule } from './activities/activities.module';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GlucoseLogsModule,
    FoodsModule,
    MealsModule,
    ActivitiesModule,
    CalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
