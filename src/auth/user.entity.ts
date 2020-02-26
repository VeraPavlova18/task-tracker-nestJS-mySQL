import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['phone'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birthday: Date;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.owner,
    { eager: true },
  )
  ownTasks: Task[];

  @OneToMany(
    type => Task,
    task => task.assignee,
    { eager: true },
  )
  assigneedTasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
