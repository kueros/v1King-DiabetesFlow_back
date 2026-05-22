import { Injectable, OnModuleInit, OnModuleDestroy, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Optional() private configService?: ConfigService) {
    super(
      process.env.NODE_ENV === 'test'
        ? { accelerateUrl: 'prisma://mock' }
        : ({ datasourceUrl: configService ? configService.get<string>('DATABASE_URL') : process.env.DATABASE_URL } as any),
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
