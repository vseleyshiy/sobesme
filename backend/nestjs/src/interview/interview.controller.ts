import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { StartInterview } from './dto/start-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Post('start')
  public async start(
    @Authorized('id') userId: string,
    @Authorized('interviewsBalance') interviewBalance: number,
    @Body() dto: StartInterview,
  ) {
    return await this.interviewService.start(userId, interviewBalance, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Get('history')
  public async history(@Authorized('id') userId: string) {
    return await this.interviewService.history(userId);
  }
}
