import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'config/prisma'
import { ComplaintService } from 'src/modules/complaint/complaint.service'
import { ComplaintModule } from 'src/modules/complaint/complaint.module'
import { CategoryService } from 'src/modules/category/category.service'
import { RegionService } from 'src/modules/region/region.service'
import { StatisticService } from 'src/modules/statistic/statistic.service'
import { AiService } from 'src/common/libs/ai'

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
