import { InterviewModule } from '@/interview/interview.module';
import { MessageModule } from '@/message/message.module';
import { UserModule } from '@/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';

@Module({
  imports: [HttpModule, InterviewModule, MessageModule, UserModule],
  controllers: [PythonController],
  providers: [PythonService],
  exports: [PythonService],
})
export class PythonModule {}
