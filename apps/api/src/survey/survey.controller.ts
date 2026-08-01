import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyResponseDto } from './dto/survey-response.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  @ApiOperation({ summary: 'List all active surveys' })
  @ApiQuery({
    name: 'organizationId',
    required: false,
    description: 'Filter by organization UUID',
  })
  @ApiOkResponse({
    description: 'List of surveys',
    type: SurveyResponseDto,
    isArray: true,
  })
  async findAll(
    @Query('organizationId') organizationId?: string,
  ): Promise<ApiResponse<SurveyResponseDto[]>> {
    const surveys = await this.surveyService.findAll(organizationId);
    return ApiResponse.success(surveys);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey by ID' })
  @ApiOkResponse({ description: 'The survey', type: SurveyResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponse<SurveyResponseDto>> {
    const survey = await this.surveyService.findOne(id);
    return ApiResponse.success(survey);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new survey' })
  @ApiOkResponse({
    description: 'The created survey',
    type: SurveyResponseDto,
  })
  async create(
    @Body() createSurveyDto: CreateSurveyDto,
  ): Promise<ApiResponse<SurveyResponseDto>> {
    const survey = await this.surveyService.create(createSurveyDto);
    return ApiResponse.success(survey);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a survey' })
  @ApiOkResponse({
    description: 'The updated survey',
    type: SurveyResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<ApiResponse<SurveyResponseDto>> {
    const survey = await this.surveyService.update(id, updateSurveyDto);
    return ApiResponse.success(survey);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a survey (sets isActive to false)' })
  @ApiOkResponse({ description: 'Survey deleted successfully' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponse<void>> {
    await this.surveyService.remove(id);
    return ApiResponse.success(undefined as unknown as void);
  }
}
