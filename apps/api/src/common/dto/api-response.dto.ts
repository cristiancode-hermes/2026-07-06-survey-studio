import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseMeta {
  @ApiProperty({ description: 'Total number of records' })
  total!: number;

  @ApiProperty({ description: 'Current page number' })
  page!: number;

  @ApiProperty({ description: 'Number of records per page' })
  pageSize!: number;
}

export class ApiResponse<T> {
  data: T;

  meta?: ApiResponseMeta;

  constructor(data: T, meta?: ApiResponseMeta) {
    this.data = data;
    this.meta = meta;
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse(data);
  }

  static paginated<T>(
    data: T,
    total: number,
    page: number,
    pageSize: number,
  ): ApiResponse<T> {
    return new ApiResponse(data, { total, page, pageSize });
  }
}
