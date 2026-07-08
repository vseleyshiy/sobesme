import { Authorization } from '@/auth/decorators/auth.decorator';
import { AnalyzeInterviewDto } from '@/python/dto/analyze-interview.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PythonService } from './python.service';

@Controller('python')
export class PythonController {
  constructor(private readonly pythonService: PythonService) {}

  @HttpCode(HttpStatus.OK)
  @Authorization()
  @Post('ai/analyze-interview')
  public async analyzeInterview(@Body() dto: AnalyzeInterviewDto) {
    return await this.pythonService.analyzeInterview(dto);
  }
}
