import { ApiProperty } from '@nestjs/swagger';

export class SurveyResponseDto {
  @ApiProperty({ description: 'Survey UUID', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Survey title' })
  title!: string;

  @ApiProperty({ description: 'Survey description', required: false })
  description?: string;

  @ApiProperty({ description: 'Number of questions in survey', default: 0 })
  questionCount!: number;

  @ApiProperty({ description: 'Whether the survey is active (soft delete flag)' })
  isActive!: boolean;

  @ApiProperty({ description: 'Organization UUID', format: 'uuid' })
  organizationId!: string;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
