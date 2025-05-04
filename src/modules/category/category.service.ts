import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'config/prisma'
import { CategoryDto } from './dto/index.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CategoryDto): Promise<any> {
    const isCategory = await this.prisma.category.findFirst({
      where: {
        title: data.title,
      },
    })
    if (isCategory) throw new BadRequestException('Category already exist')

    return await this.prisma.category.create({
      data,
    })
  }

  async getCategories(): Promise<any> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
        complaintsCount: true,
      },
    })
  }

  async getCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        complaints: true,
      },
    })

    if (!category) throw new BadRequestException('Category not found')
    return category
  }

  async update(id: number, data: CategoryDto) {
    await this.getCategory(id)
    await this.prisma.category.update({
      where: { id },
      data,
    })

    return 'Category Updated'
  }

  async updateValue(id: number, value: number = 1) {
    await this.getCategory(id)
    await this.prisma.category.update({
      where: { id },
      data: {
        complaintsCount: { increment: value },
      },
    })
  }

  async delete(id: number) {
    await this.getCategory(id)
    await this.prisma.category.delete({
      where: { id },
    })

    return 'Category Deleted'
  }
}
