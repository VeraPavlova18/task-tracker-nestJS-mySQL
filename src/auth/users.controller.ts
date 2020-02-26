import {
  Controller,
  Body,
  ValidationPipe,
  Get,
  Query,
  Logger,
  UseGuards,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Patch,
  UsePipes,
} from '@nestjs/common';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { GetUser } from './get-user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    return this.usersService.getUsers(filterDto, user);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.getUserById(id, user);
  }

  @Delete('/:id')
  deleteUserById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.usersService.deleteUserById(id, user);
  }

  @Patch(':id/edit')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto, user);
  }
}
