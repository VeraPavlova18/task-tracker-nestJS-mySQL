import { Controller, Post, Body, ValidationPipe, Get, Query, Logger, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { GetUser } from './get-user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    return this.usersService.getUsers(filterDto, user);
  }
}
