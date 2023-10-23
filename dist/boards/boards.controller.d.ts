import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
export declare class BoardsController {
    private boardService;
    constructor(boardService: BoardsService);
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getAllBoard(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: any): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
