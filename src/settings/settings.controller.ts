import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':userId')
  async getSettings(@Param('userId') userId: string) {
    return this.settingsService.getSettings(userId);
  }

  @Put(':userId')
  async updateSettings(
    @Param('userId') userId: string,
    @Body() data: { fsi?: number; cir?: number; targetGlucose?: number },
  ) {
    return this.settingsService.upsertSettings(userId, data);
  }
}
