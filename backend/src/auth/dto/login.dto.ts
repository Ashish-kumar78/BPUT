import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '2305201001', description: 'Registration number, College ID, or email' })
  @IsString()
  @IsNotEmpty()
  identifier!: string;

  @ApiProperty({ example: 'gift123', description: 'User account password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
