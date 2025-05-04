import { Module, OnModuleInit } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { ComplaintModule } from './modules/complaint/complaint.module'
import { StatisticModule } from './statistic/statistic.module'
import { CategoryModule } from './category/category.module'
import { RegionModule } from './region/region.module'
import { JobsModule } from './modules/jobs/jobs.module'
import { BullModule } from '@nestjs/bullmq'

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    ComplaintModule,
    StatisticModule,
    CategoryModule,
    RegionModule,
    JobsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
