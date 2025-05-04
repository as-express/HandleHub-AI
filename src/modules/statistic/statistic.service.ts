import { Injectable } from '@nestjs/common'
import { PrismaService } from 'config/prisma'
import { UpdateDto } from './dto/index.dto'
import { StatisticModules } from './module.enum'

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    return this.prisma.statistic.findUnique({ where: { id: 1 } })
  }

  async update(module: StatisticModules, rm: boolean) {
    await this.prisma.statistic.update({
      where: { id: 1 },
      data: {
        [module]: {
          increment: rm ? -1 : 1,
        },
      },
    })
  }
}
