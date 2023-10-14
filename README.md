# CloneApp

출처 : [따라하는 네스트 제이에스](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4)


  
## 기본요소

- service를 controller에서 이용하기

  ```typescript
  boardsService: BoardsService;
  constructor(boardsService: BoardsService) {
      this.boardsService = boardsService;
  }
  constructor(private boardsService: BoardsService) {} // 접근 제한자를 붙이면 위의 코드를 간단하게 한줄로 표현가능
  ```

  
## CRUD

###  배열 정의 및 배열 Read

- service에서 배열 정의 및 리턴값 불러오기

  ```typescript
  private boards = [];
  getAllBooks() {
      return this.boards;
  }
  ```

- controller 객체에서 라우터 설정(@GET, @POST, @PUT, @PATCH..)하여 새로운 메소드 내에서 service 객체 이용

  ```typescript
  @Get('/')
  getAllBoard() {
      return this.boardService.getAllBooks();
  }
  ```

###  Create

#### 데이터 모델 정의

- board.model.ts 파일 생성하여 게시물에 필요한 데이터 모델 정의

  - 사용 키워드
    - interface : 변수 타입 체크(구조만 정의)
    - classes : 변수 타입 체크 및 인스턴스 생성가능
  - 게시글의 공개/비공개 상태 지정 : enum BoardStatus로 새롭게 지정

    ```typescript
    export interface Board {
      id: string;
      title: string;
      description: string;
      status: BoardStatus;
    }
    export enum BoardStatus {
      PUBLIC = 'PUBLIC',
      PRIVATE = 'PRIVATE',
    }
    ```

- 생성한 model 반영하기
  - service : 변수와 메소드
  - controller : 핸들러에서 결과값 리턴하는 부분

#### 데이터 생성하기

- service : 생성한 모델을 board로 정의하고 기존만든 배열(board)에 push

  - id는 유니크한 값임. DB 이용하면 알아서 값을 넣어주지만, 지금은 로컬환경에서 배열을 이용하므로 uuid 모듈 이용
    ```bash
        npm install uuid --save
    ```

  ```typescript
      import { v1 as uuid } from 'uuid'; // uuid import (v1 : 버전1 (여러가지 버전 존재))

      createBoard(title: string, description: string) {
          const board: Board = {
              id: uuid(),
              title: title, // 중복되는 경우 1번만 사용 가능 title
              description: description,
              status: BoardStatus.PUBLIC,
          };
          this.boards.push(board);
          return board;
      }
  ```

- controller : 경로 boards에 데이터(title, description) 전송시, 데이터 생성
  - 포스트맨으로 데이터 전송 후 서버에서 확인 가능
  ```typescript
  @Controller('boards')
  export class BoardsController {
    @Post()
    createBoard(
      @Body('title') title: string,
      @Body('description') description: string,
    ): Board {
      return this.boardService.createBoard(title, description);
    }
    // @Post()
    // createBoard(@Body() body) {
    //   console.log('body', body);
    // }
  }
  ```
  
  
- DTO(Data Transfer Object) : 데이터 전송과 관련된 로직을 최소화하기 위해 사용한다. 테이블 내에는 여러가지 다양한 속성이 존재하는데 적은 수의 속성을 주고 받을 때는 위에서 사용한 것처럼 각각의 속성을 일일이 적어주는 것은 문제가 되지 않지만, 많은 수의 속성을 주고 받을 때 어떤 특정 속성을 변경하고 싶다면 여러 로직에서 이 속성에 대한 정보를 변경해야 하기에 매우 번거롭다. 따라서, 쉬운유지보수를 위해 DTO를 이용하여 속성을 관리한다.

  - class, interface 둘다 사용가능 (class 권장)
  - dto 폴더 생성
  
    - create-board.dto.ts 파일 생성
  
      ```typescript
      export class CreateBoardDto {
        title: string;
        description: string;
      }
      ```
  
  - 데이터 전송과 관련된 부분 dto로 바꿔주기
  
    - service
  
      ```typescript
          createBoard(createBoardDto: CreateBoardDto) {
          const { title, description } = createBoardDto;
          }
      ```
  
    - controller
  
      ```typescript
          @Post()
          createBoard(@Body() createBoardDto: CreateBoardDto): Board {
              return this.boardService.createBoard(createBoardDto);
          }
      ```

  
###  Read

#### 특정 속성을 가진 데이터 읽기

- service : 전달받은 ID와 일치하는 경우 데이터 리턴하는 함수 생성
  ```typescript
      getBoardById(id: string): Board {
          return this.boards.find((board) => board.id === id);
      }
  ```
- controller : 경로 boards/id에 접속시 id에 대한 데이터 반환

  ```typescript
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
      return this.boardService.getBoardById(id);
  }
  ```

  > 파라미터 전체를 하나의 변수에 입력받고 싶을 때

  ```typescript
      @Param() params : string[]
      //@Param('id') id :string
  ```

  
###  Delete

- service : 전달받은 ID와 일치하지 않은 데이터만 남기기

  ```typescript
      deleteBoard(id: string): void {
          this.boards = this.boards.filter((board) => board.id !== id);
      }
  ```

- controller: 경로 boards/id에 delete id 삭제

  ```typescript
      @Delete('/:id')
      deleteBoard(@Param('id') id: string): void {
          this.boardService.deleteBoard(id);
      }
  ```

  
###  Update

- 업데이트 기능 : 게시물의 상태(public or private)를 변경
- service

  ```typescript
  updateBoardStatus(id: string, status: BoardStatus): Board {
      const board = this.getBoardById(id);
      board.status = status;
      return board;
  }
  ```

- controlloer : 경로 boards/id/status에 body status에 변경값 넣어 데이터 update

  ```typescript
  @Patch('/:id/status')
  updateBoardStatus(
      @Param('id') id: string,
      @Body('status') status: BoardStatus,
  ) {
      return this.boardService.updateBoardStatus(id, status);
  }
  ```
