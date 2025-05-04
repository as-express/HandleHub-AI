import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'config/prisma'
import { ComplaintService } from 'src/modules/complaint/complaint.service'
import { ComplaintModule } from 'src/modules/complaint/complaint.module'
import { CategoryService } from 'src/category/category.service'
import { RegionService } from 'src/modules/region/region.service'
import { AiService } from 'common/libs/ai'
import { StatisticService } from 'src/statistic/statistic.service'

@Module({
  imports: [ComplaintModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    ComplaintService,
    CategoryService,
    RegionService,
    AiService,
    StatisticService,
  ],
})
export class UserModule {}
