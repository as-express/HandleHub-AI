import { BadRequestException, Injectable } from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'config/prisma'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signup(data: SignupDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (isUser) {
      throw new BadRequestException('User already exists')
    }
    data.password = await hash(data.password)

    const user = await this.prisma.user.create({
      data,
    })
    return this.issueTokens(user.id)
  }

  async signin(data: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isPassword = await verify(user.password, data.password)
    if (!isPassword) {
      throw new BadRequestException('Invalid password')
    }

    return this.issueTokens(user.id)
  }

  async refreshToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) {
      throw new BadRequestException('Invalid refresh token')
    }

    return this.issueTokens(result.id)
  }

  async googleCallback() {}

  private issueTokens(userId: number) {
    const data = { id: userId }

    const refreshToken = this.jwt.sign(data, { expiresIn: '15d' })
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' })

    return {
      refreshToken,
      accessToken,
    }
  }
}
