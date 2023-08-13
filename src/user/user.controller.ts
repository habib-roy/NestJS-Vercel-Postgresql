import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body('nama') nama: string): Promise<UserEntity> {
    return await this.userService.createUsers(nama);
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('nama') nama: string,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, nama);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
