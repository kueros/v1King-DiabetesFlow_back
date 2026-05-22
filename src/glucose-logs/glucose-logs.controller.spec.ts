import { Test, TestingModule } from '@nestjs/testing';
import { GlucoseLogsController } from './glucose-logs.controller';

describe('GlucoseLogsController', () => {
  let controller: GlucoseLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlucoseLogsController],
    }).compile();

    controller = module.get<GlucoseLogsController>(GlucoseLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
