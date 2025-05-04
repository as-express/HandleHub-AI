import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const GoogleAuth = () => UseGuards(AuthGuard('google'))
