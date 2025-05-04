import { PrismaService } from './prisma'

export async function statisticConfig() {
  const prisma = new PrismaService()

  const statistic = await prisma.statistic.findUnique({
    where: {
      id: 1,
    },
  })
  if (statistic) {
    return
  }

  await prisma.statistic.create({
    data: {},
  })
}
