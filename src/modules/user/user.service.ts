import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'config/prisma'
import { UpdatePassDto } from './dto/update-pass.dto'
import { hash, verify } from 'argon2'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async profile(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    })
  }

  async updatePassword(userId: number, data: UpdatePassDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) throw new BadRequestException('User is not defined')

    const isPassword = await verify(user.password, data.currentPassword)
    if (!isPassword) throw new BadRequestException('Password is incorrect')

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: await hash(data.newPassword) },
    })

    return { message: 'Password updated' }
  }
}
