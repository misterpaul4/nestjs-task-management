import { Tag } from 'src/tags/entities/tag.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Tag, (tag) => tag.users, { cascade: true })
  @JoinTable({ name: 'users_tags' })
  tags: Tag[];
}
