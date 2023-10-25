import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
// import { BoardStatus } from './board.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;

  @Column()
  userId: number;
}
