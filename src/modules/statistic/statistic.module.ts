import { Module } from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { StatisticController } from './statistic.controller'
import { PrismaService } from 'config/prisma'

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, PrismaService],
  exports: [StatisticService],
})
export class StatisticModule {}
