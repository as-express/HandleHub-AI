import { Status } from 'generated/prisma'
import { StatisticModules } from 'src/modules/statistic/module.enum'

export const statusToModuleMap: Record<Status, StatisticModules> = {
  [Status.PENDING]: StatisticModules.PENDING,
  [Status.IN_PROGRESS]: StatisticModules.IN_PROGRESS,
  [Status.RESOLVED]: StatisticModules.RESOLVED,
  [Status.REJECTED]: StatisticModules.REJECTED,
}
