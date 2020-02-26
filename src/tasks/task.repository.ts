import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const {
      title,
      description,
    } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.VIEW;
    task.createdAt = moment().toDate();
    task.owner = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a task for user ${user.email}. Data: ${createTaskDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    delete task.owner;
    return task;
  }

}
