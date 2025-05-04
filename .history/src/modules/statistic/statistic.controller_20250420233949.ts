import { Controller, Get } from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { AuthRoles } from 'common/decorators/auth-roles'

@Controller('statistic')
@AuthRoles('ADMIN')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  async get() {
    return this.statisticService.get()
  }
}
