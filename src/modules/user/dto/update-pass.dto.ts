import { IsNotEmpty, MinLength } from 'class-validator'

export class UpdatePassDto {
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  currentPassword: string

  @MinLength(8, { message: 'Password must be at least 8 characters long  ' })
  newPassword: string
}
