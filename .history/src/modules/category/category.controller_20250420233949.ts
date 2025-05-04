import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/index.dto'
import { AuthRoles } from 'common/decorators/auth-roles'

@Controller('category')
@AuthRoles('ADMIN')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CategoryDto) {
    return await this.categoryService.create(data)
  }

  @Get()
  async getCategories() {
    return await this.categoryService.getCategories()
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoryService.getCategory(+id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(@Param('id') id: string, @Body() data: CategoryDto) {
    return await this.categoryService.update(+id, data)
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.delete(+id)
  }
}
