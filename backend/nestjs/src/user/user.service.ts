import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
      include: {
        accounts: true,
      },
    });

    if (!user)
      throw new NotFoundException('Пользователь с таким id не найден.');

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(dto: CreateUserDto) {
    const { email, password, picture, method, isVerified } = dto;

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        picture,
        method,
        isVerified,
      },
      omit: {
        password: true,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
      },
      omit: {
        password: true,
      },
    });

    return updatedUser;
  }
}
