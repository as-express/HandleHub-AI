import { Module } from '@nestjs/common'
import { RegionService } from './region.service'
import { RegionController } from './region.controller'
import { PrismaService } from 'config/prisma'

@Module({
  controllers: [RegionController],
  providers: [RegionService, PrismaService],
  exports: [RegionService],
})
export class RegionModule {}
