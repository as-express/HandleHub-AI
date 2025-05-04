import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { STATUS } from '../status.enum'

export class ComplaintUpdateDto {
  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS

  @IsOptional()
  comment: string
}
