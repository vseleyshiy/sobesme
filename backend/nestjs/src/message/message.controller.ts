import { Authorization } from '@/auth/decorators/auth.decorator';
import { CreateMessageDto } from '@/message/dto/create-message.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
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

  @HttpCode(HttpStatus.OK)
  @Post()
  @Authorization()
  async create(@Body() dto: CreateMessageDto) {
    return await this.messageService.create(dto);
  }
}
