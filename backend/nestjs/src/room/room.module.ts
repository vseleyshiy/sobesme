import { PythonModule } from '@/python/python.module';
import { RedisModule } from '@/redis/redis.module';
import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  imports: [RedisModule, PythonModule],
  providers: [RoomGateway, RoomService],
})
export class RoomModule {}
