import { IsEnum, IsNumber } from 'class-validator'
import { StatisticModules } from '../module.enum'

export class UpdateDto {
  @IsEnum(StatisticModules)
  module: StatisticModules

  @IsNumber()
  value: number
}
