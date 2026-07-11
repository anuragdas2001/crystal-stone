import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilingModule } from './profiling/profiling.module';

@Module({
  imports: [PrismaModule, ProfilingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
