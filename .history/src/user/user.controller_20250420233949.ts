import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'common/guards/jwt'
import { requestUser } from 'common/decorators/user'
import { UpdatePassDto } from './dto/update-pass.dto'
import { ComplaintService } from 'src/complaint/complaint.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly complaintService: ComplaintService,
  ) {}

  @Get('profile')
  @Auth()
  async profile(@requestUser('id') userId: number) {
    return await this.userService.profile(userId)
  }

  @Get('complaints')
  @Auth()
  async complaints(@requestUser('id') userId: number) {
    return await this.complaintService.getUserComplaints(userId)
  }

  @Put('update-password')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updatePassword(
    @requestUser('id') userId: number,
    @Body() data: UpdatePassDto,
  ) {
    return await this.userService.updatePassword(userId, data)
  }
}
