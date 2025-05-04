import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { BullModule } from '@nestjs/bullmq'
import { JobProcessor } from './job.processor'
import { ComplaintService } from 'src/modules/complaint/complaint.service'
import { CategoryService } from 'src/category/category.service'
import { RegionService } from 'src/region/region.service'
import { PrismaService } from 'config/prisma'
import { StatisticService } from 'src/statistic/statistic.service'
import { AiService } from 'common/libs/ai'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'jobs',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [
    JobsService,
    JobProcessor,
    ComplaintService,
    CategoryService,
    RegionService,
    PrismaService,
    StatisticService,
    AiService,
  ],
  exports: [JobsService],
})
export class JobsModule {}
