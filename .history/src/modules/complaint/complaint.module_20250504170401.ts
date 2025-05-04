import { Module } from '@nestjs/common'
import { ComplaintService } from './complaint.service'
import { ComplaintController } from './complaint.controller'
import { AiService } from 'common/libs/ai'
import { PrismaService } from 'config/prisma'
import { StatisticService } from 'src/modules/statistic/statistic.service'
import { CategoryService } from 'src/category/category.service'
import { RegionService } from 'src/modules/region/region.service'
import { JobsService } from 'src/modules/jobs/jobs.service'
import { JobProcessor } from 'src/modules/jobs/job.processor'
import { BullModule } from '@nestjs/bullmq'

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
  controllers: [ComplaintController],
  providers: [
    ComplaintService,
    AiService,
    PrismaService,
    StatisticService,
    CategoryService,
    RegionService,
    JobsService,
    JobProcessor,
  ],
})
export class ComplaintModule {}
