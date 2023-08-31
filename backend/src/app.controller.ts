import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all cats',
    description: 'Exposes default prometheus node metrics',
  })
  @ApiOkResponse({
    status: 200,
    description: 'OK',
    isArray: true,
    content: {
      'application/json': {
        example: [{ id: 1, name: 'Whiskers' }],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '1\n\nBug',
    isArray: true,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
