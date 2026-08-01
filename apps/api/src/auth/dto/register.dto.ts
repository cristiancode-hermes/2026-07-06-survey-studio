import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'securePassword123', description: 'User password (min 6 chars)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'My Organization', description: 'Organization name' })
  @IsString()
  @IsNotEmpty()
  organizationName!: string;

  @ApiPropertyOptional({ example: 'Demo User', description: 'User display name' })
  @IsString()
  @IsOptional()
  name?: string;
}
