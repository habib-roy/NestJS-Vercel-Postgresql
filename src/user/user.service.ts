import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async createUsers(nama: string) {
    const newUser = await this.userRepository.create({ nama });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) return user;
    throw new NotFoundException(`User ${id} not found`);
  }

  async updateUser(id: string, nama: string) {
    const user = await this.userRepository.save({ id, nama });
    if (user) return user;
    throw new NotFoundException(`User ${id} not found`);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete({ id });
    if (user) return 'Delete success';
    throw new NotFoundException(`User ${id} not found`);
  }
}
