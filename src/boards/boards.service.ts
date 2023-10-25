import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
// import { NotFoundException } from '@nestjs/common';
// import { Board, BoardStatus } from './board.model';
// import { v1 as uuid } from 'uuid'; //v1 : 버전1 (여러가지 버전 존재)
// import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getAllBoards(): Promise<Board[]> {
    console.log(this.boardRepository);
    return this.boardRepository.find();
  }
  async getAllMyBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
  async getMyBoardsById(id: number, user: User): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }

  async deleteMyBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({
      id: id,
      userId: user.id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async updateMyBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const board = await this.getMyBoardsById(id, user);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
// getBoardById(id: string): Board {
//   const found = this.boards.find((board) => board.id === id);
//   if (!found) {
//     throw new NotFoundException(`Can't find Board with id ${id}`);
//   }
//   return found;
// }

// 로컬에 저장할 경우
// private boards: Board[] = [
//   {
//     id: 'cf2837b0-6b4c-11ee-8d95-2dbe28d0b2f4',
//     title: 'title1',
//     description: 'description 1',
//     status: BoardStatus.PUBLIC,
//   },
// ];
// getAllBoards(): Board[] {
//   return this.boards;
// }
// createBoard(createBoardDto: CreateBoardDto) {
//   const { title, description } = createBoardDto;
//   const board: Board = {
//     id: uuid(),
//     title: title, // 중복되는 경우 1번만 사용 가능 title
//     description: description,
//     status: BoardStatus.PUBLIC,
//   };
//   this.boards.push(board);
//   return board;
// }
// getBoardById(id: string): Board {
//   const found = this.boards.find((board) => board.id === id);
//   if (!found) {
//     throw new NotFoundException(`Can't find Board with id ${id}`);
//   }
//   return found;
// }
// deleteBoard(id: string): void {
//   this.boards = this.boards.filter((board) => board.id !== id);
// }
// updateBoardStatus(id: string, status: BoardStatus): Board {
//   const board = this.getBoardById(id);
//   board.status = status;
//   return board;
// }
