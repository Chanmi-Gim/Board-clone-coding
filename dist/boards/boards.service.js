"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const board_repository_1 = require("./board.repository");
const typeorm_1 = require("@nestjs/typeorm");
let BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    createBoard(createBoardDto, user) {
        return this.boardRepository.createBoard(createBoardDto, user);
    }
    async getAllBoards() {
        console.log(this.boardRepository);
        return this.boardRepository.find();
    }
    async getAllMyBoards(user) {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
    }
    async getMyBoardsById(id, user) {
        const found = await this.boardRepository.findOne({
            where: { id, userId: user.id },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async getBoardById(id) {
        const found = await this.boardRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async deleteBoard(id) {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log('result', result);
    }
    async deleteMyBoard(id, user) {
        const result = await this.boardRepository.delete({
            id: id,
            userId: user.id,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log('result', result);
    }
    async updateBoardStatus(id, status) {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
    async updateMyBoardStatus(id, status, user) {
        const board = await this.getMyBoardsById(id, user);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_repository_1.BoardRepository)),
    __metadata("design:paramtypes", [board_repository_1.BoardRepository])
], BoardsService);
//# sourceMappingURL=boards.service.js.map