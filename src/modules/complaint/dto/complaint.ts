import { IsNotEmpty } from 'class-validator'

export class ComplaintDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  region: string
}
