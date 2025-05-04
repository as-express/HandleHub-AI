import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'config/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'config/prisma'
import { JwtStrategy } from 'src/common/libs/passport/jwt'
import { GoogleStrategy } from 'src/common/libs/passport/google'

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, PrismaService],
})
export class AuthModule {}
