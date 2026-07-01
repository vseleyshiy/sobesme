import { InterviewModule } from '@/interview/interview.module';
import { MessageModule } from '@/message/message.module';
import { Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';

@Module({
  imports: [InterviewModule, MessageModule],
  controllers: [PythonController],
  providers: [PythonService],
  exports: [PythonService],
})
export class PythonModule {}
