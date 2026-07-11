import { Module } from '@nestjs/common';
import { ProfilingController } from './profiling.controller';
import { ProfilingService } from './profiling.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilingController],
  providers: [ProfilingService],
  exports: [ProfilingService],
})
export class ProfilingModule {}
