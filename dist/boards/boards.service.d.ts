import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    getAllBoards(): Promise<Board[]>;
    getAllMyBoards(user: User): Promise<Board[]>;
    getMyBoardsById(id: number, user: User): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
    deleteMyBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    updateMyBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board>;
}
