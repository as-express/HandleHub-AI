import { ComplaintDto } from './complaint'

export class ComplaintRequestDto extends ComplaintDto {
  regions: object[]
  categories: object[]
}
