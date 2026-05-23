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
import { MetricsModule } from './metrics/metrics.module';
import { GlucoseModule } from './glucose/glucose.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GlucoseLogsModule,
    FoodsModule,
    MealsModule,
    ActivitiesModule,
    CalculatorModule,
    MetricsModule,
    GlucoseModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
