import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'config/prisma'
import { RegionDto } from './dto/index.dto'

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegionDto) {
    const isRegion = await this.prisma.region.findFirst({
      where: {
        title: data.title,
      },
    })
    if (isRegion) throw new BadRequestException('Region already exist')

    return await this.prisma.region.create({
      data,
    })
  }

  async getRegions() {
    return await this.prisma.region.findMany({
      select: {
        id: true,
        title: true,
        complaintsCount: true,
      },
    })
  }

  async getRegion(id: number) {
    const region = await this.prisma.region.findUnique({
      where: { id },
      include: {
        complaints: true,
      },
    })
    if (!region) throw new BadRequestException('Region not found')

    return region
  }

  async update(id: number, data: RegionDto) {
    await this.getRegion(id)
    await this.prisma.region.update({
      where: { id },
      data,
    })

    return 'Region Updated'
  }

  async updateValue(id: number, value: number = 1) {
    await this.getRegion(id)
    await this.prisma.region.update({
      where: { id },
      data: {
        complaintsCount: { increment: value },
      },
    })
  }

  async delete(id: number) {
    await this.getRegion(id)
    await this.prisma.region.delete({
      where: { id },
    })

    return 'Region Deleted'
  }
}
