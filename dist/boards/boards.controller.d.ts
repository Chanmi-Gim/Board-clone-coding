import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
export declare class BoardsController {
    private boardService;
    private logger;
    constructor(boardService: BoardsService);
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    getAllMyBoard(user: User): Promise<Board[]>;
    getAllBoard(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    getMyBoardById(id: number, user: User): Promise<Board>;
    deleteBoard(id: any): Promise<void>;
    deleteMyBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    updateMyBoardStatus(id: number, status: BoardStatus, user: User): Promise<Board>;
}
