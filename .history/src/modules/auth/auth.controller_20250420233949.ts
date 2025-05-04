import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { GoogleAuth } from 'common/guards/google'
import { Request } from 'express'
import { RefreshDto } from './dto/refresh.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() data: SignupDto) {
    const result = await this.authService.signup(data)
    return result
  }

  @Post('signin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async signin(@Body() data: SigninDto) {
    const result = await this.authService.signin(data)
    return result
  }

  @Get('google')
  @GoogleAuth()
  async googleAuth() {}

  @Post('google/callback')
  @GoogleAuth()
  googleCallback(@Req() req: Request) {}

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async refresh(@Body() data: RefreshDto) {
    const result = await this.authService.refreshToken(data.refreshToken)
    return result
  }
}
