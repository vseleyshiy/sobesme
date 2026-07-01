import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { StartInterviewDto } from './dto/start-interview.dto';
import { InterviewService } from './interview.service';

@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Get()
  public async findAll(@Authorized('id') userId: string) {
    return await this.interviewService.findAllByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Get(':interviewId')
  public async findById(@Param('interviewId') interviewId: string) {
    return await this.interviewService.findById(interviewId);
  }

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Post('start')
  public async start(
    @Authorized('id') userId: string,
    @Authorized('interviewsBalance') interviewBalance: number,
    @Body() dto: StartInterviewDto,
  ) {
    return await this.interviewService.start(userId, interviewBalance, dto);
  }
}
