import { Authorization } from '@/auth/decorators/auth.decorator';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/many-by-interview-id/:interviewId')
  @Authorization()
  async findManyByInterviewId(@Param('interviewId') interviewId: string) {
    return await this.messageService.findManyByInterviewId(interviewId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @Authorization()
  async findById(@Param('id') id: string) {
    return await this.messageService.findById(id);
  }
}
