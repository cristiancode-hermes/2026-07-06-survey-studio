import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSurveyDto {
  @ApiProperty({ description: 'Survey title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Survey description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Organization UUID', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  organizationId!: string;
}
