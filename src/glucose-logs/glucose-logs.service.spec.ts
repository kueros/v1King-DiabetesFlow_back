import { Test, TestingModule } from '@nestjs/testing';
import { GlucoseLogsService } from './glucose-logs.service';

describe('GlucoseLogsService', () => {
  let service: GlucoseLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlucoseLogsService],
    }).compile();

    service = module.get<GlucoseLogsService>(GlucoseLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
