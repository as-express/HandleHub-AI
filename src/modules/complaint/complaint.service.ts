import { BadRequestException, Injectable } from '@nestjs/common'
import { ComplaintDto } from './dto/complaint'
import { ComplaintUpdateDto } from './dto/update.dto'
import { PrismaService } from 'config/prisma'
import { StatisticService } from 'src/modules/statistic/statistic.service'
import { StatisticModules } from 'src/modules/statistic/module.enum'
import { STATUS } from './status.enum'
import { CategoryService } from 'src/modules/category/category.service'
import { RegionService } from 'src/modules/region/region.service'
import { AiService } from 'src/common/libs/ai'
import { statusToModuleMap } from 'src/common/helpers/status-mapper'

@Injectable()
export class ComplaintService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly AiService: AiService,
    private readonly statisticService: StatisticService,
    private categoryService: CategoryService,
    private regionService: RegionService,
  ) {}

  async create(user: number, data: ComplaintDto): Promise<any> {
    const anonymous = user === undefined ? true : false
    const userId = user !== undefined ? user : null

    const result: string = await this.aiService(data)
    const parsedData = JSON.parse(result)

    const complaint = await this.prisma.complaint.create({
      data: {
        ...parsedData,
        anonymous,
        userId,
      },
    })

    await this.statisticService.update(StatisticModules.TOTAL, false)
    await this.statisticService.update(StatisticModules.PENDING, false)

    await this.categoryService.updateValue(Number(complaint.categoryId))
    await this.regionService.updateValue(Number(complaint.categoryId))

    return 'Complaint created'
  }

  async getAll() {
    return await this.prisma.complaint.findMany({
      where: {
        isArchived: false,
      },
      select: {
        id: true,
        regionId: true,
        categoryId: true,
        status: true,
        urgency: true,
        createdAt: true,
      },
    })
  }

  async getOne(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: {
        id,
        isArchived: false,
      },
    })

    if (!complaint) {
      throw new BadRequestException('Complaint not found')
    }

    return complaint
  }

  async getArchived() {
    return await this.prisma.complaint.findMany({
      where: {
        isArchived: true,
      },
    })
  }

  async getUserComplaints(userId: number) {
    return await this.prisma.complaint.findMany({
      where: {
        anonymous: false,
        userId,
      },
    })
  }

  async update(id: number, data: ComplaintUpdateDto) {
    const complaint = await this.getOne(id)
    const isArchive =
      data.status === STATUS.RESOLVED || data.status === STATUS.REJECTED
        ? true
        : false
    await this.prisma.complaint.update({
      where: {
        id,
      },
      data: {
        status: data.status,
        isArchived: isArchive,
        comment: data.comment,
      },
    })

    await this.statisticService.update(
      statusToModuleMap[complaint.status],
      true,
    )
    await this.statisticService.update(statusToModuleMap[data.status], false)
  }

  async unArchive(id: number) {
    const complaint = await this.prisma.complaint.findUnique({
      where: {
        isArchived: true,
        id,
      },
    })
    if (!complaint) {
      throw new BadRequestException('Complaint not found')
    }

    await this.prisma.complaint.update({
      where: {
        id,
      },
      data: {
        isArchived: false,
      },
    })
  }

  private async aiService(data: ComplaintDto): Promise<any> {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
      },
    })
    const regions = await this.prisma.region.findMany({
      select: {
        id: true,
        title: true,
      },
    })

    return await this.AiService.generateCategoryAndUrgency({
      title: data.title,
      description: data.description,
      region: data.region,
      regions: regions,
      categories: categories,
    })
  }
}
