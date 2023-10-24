import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  username: string;

  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/, { message: '알파벳과 숫자만 입력가능합니다.' })
  password: string;
}
