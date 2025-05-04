import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ComplaintService } from './complaint.service'
import { ComplaintDto } from './dto/complaint'
import { ComplaintUpdateDto } from './dto/update.dto'
import { OptionalAuthGuard } from 'common/decorators/optional-user'
import { requestUser } from 'common/decorators/user'
import { AuthRoles } from 'common/decorators/auth-roles'
import { JobsService } from 'src/jobs/jobs.service'

@Controller('complaint')
export class ComplaintController {
  constructor(
    private readonly complaintService: ComplaintService,
    private readonly jobService: JobsService,
  ) {}

  @Post()
  @UseGuards(OptionalAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @requestUser('id') userId: number,
    @Body() data: ComplaintDto,
  ): Promise<string> {
    await this.jobService.addJob({ data, user: userId })
    return 'Your Complaint has been received'
  }

  @Get()
  @AuthRoles('ADMIN')
  async getComplaints() {
    return this.complaintService.getAll()
  }

  @Get('archive')
  @AuthRoles('ADMIN')
  async getArchivedComplaints() {
    return this.complaintService.getArchived()
  }

  @Get(':id')
  @AuthRoles('ADMIN', 'ANONYMOUS')
  async getComplaint(@Param('id') id: string) {
    return this.complaintService.getOne(+id)
  }

  @Put(':id')
  @AuthRoles('ADMIN')
  @UsePipes(new ValidationPipe())
  async updateComplaint(
    @Param('id') id: string,
    @Body() data: ComplaintUpdateDto,
  ) {
    return this.complaintService.update(+id, data)
  }

  @Put('archive/:id')
  @AuthRoles('ADMIN', 'EMPLOYEE')
  async unArchive(@Param('id') id: string) {
    return this.complaintService.unArchive(+id)
  }
}
