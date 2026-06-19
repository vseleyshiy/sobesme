import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(@Authorized('id') userId: string) {
    return await this.userService.findById(userId);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  public async updateProfile(
    @Authorized('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, dto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findById(@Param('id') userId: string) {
    return await this.userService.findById(userId);
  }
}
