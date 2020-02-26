import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  status: TaskStatus;

  @ManyToOne(
    type => User,
    owner => owner.ownTasks,
    { eager: false },
  )
  owner: User;

  @ManyToOne(
    type => User,
    assignee => assignee.assigneedTasks,
    { eager: false },
  )
  assignee: User;

  @Column()
  ownerId: number;

  @Column()
  assigneeId: number;
}
