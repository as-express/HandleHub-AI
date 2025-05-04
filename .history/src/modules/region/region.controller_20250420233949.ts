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
import { RegionService } from './region.service'
import { RegionDto } from './dto/index.dto'
import { AuthRoles } from 'common/decorators/auth-roles'

@Controller('region')
@AuthRoles('ADMIN')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: RegionDto) {
    return await this.regionService.create(data)
  }

  @Get()
  async getRegions() {
    return await this.regionService.getRegions()
  }

  @Get(':id')
  async getRegion(@Param('id') id: string) {
    return await this.regionService.getRegion(+id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateRegion(@Param() id: string, @Body() data: RegionDto) {
    return await this.regionService.update(+id, data)
  }

  @Delete(':id')
  async deleteRegion(@Param('id') id: string) {
    return await this.regionService.delete(+id)
  }
}
