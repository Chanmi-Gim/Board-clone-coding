import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  Delete,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Patch,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { Board, BoardStatus } from './board.model';
// import { CreateBoardDto } fvrom './dto/create-board.dto';
// import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  // 모든 게시물 가져오기
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }
  // id로 특정 게시물 가져오기
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // 해당 유저의 게시물만 가져오기
  @Get('/myboards')
  getAllMyBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllMyBoards(user);
  }

  // 해당 유저가 id로 특정 게시물 가져오기
  @Get('/myboards/:id')
  getMyBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.getMyBoardsById(id, user);
  }

  // 게시물 삭제하기
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  // 해당 유저가 id로 자신이 생성한 특정 게시물을 삭제하기
  @Delete('/myboards/:id')
  deleteMyBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteMyBoard(id, user);
  }

  // id로 게시물 상태 수정하기
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  // 해당 유저가 id로 자신이 생성한 특정 게시물을 수정하기
  @Patch('/:id/mystatus')
  updateMyBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User,
  ) {
    return this.boardService.updateMyBoardStatus(id, status, user);
  }

  // 로컬시 사용
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
