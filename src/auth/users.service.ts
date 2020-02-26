import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUsers(filterDto: GetUsersFilterDto, user: User): Promise<User[]> {
    return this.userRepository.getUsers(filterDto, user);
  }

  async getUserById(id: number, user: User): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!existUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return existUser;
  }

  async deleteUserById(id: number, user: User): Promise<void> {
    const userExist = await this.getUserById(id, user);

    if (userExist.id === user.id) {
      this.logger.verbose(
        `User "${user.email}" can't delete himself herself.`,
      );
      throw new InternalServerErrorException(`User "${user.email}" can't delete himself herself.`);
    }

    await this.userRepository.delete(userExist);
    this.logger.verbose(`User "${user.email}" deleted user with ID "${id}".`);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      password,
    } = updateUserDto;
    const existUser = await this.getUserById(id, user);

    existUser.firstName = firstName ?? existUser.firstName;
    existUser.lastName = lastName ?? existUser.lastName;
    existUser.email = email ?? existUser.email;
    existUser.phone = phone ?? existUser.phone;
    existUser.birthday = birthday ?? existUser.birthday;

    if (password) {
      existUser.salt = await bcrypt.genSalt();
      existUser.password = await this.userRepository.hashPassword(password, existUser.salt);
    }

    try {
      return await existUser.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
