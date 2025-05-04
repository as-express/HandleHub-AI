import { IsNotEmpty } from 'class-validator'

export class RegionDto {
  @IsNotEmpty()
  title: string
}
