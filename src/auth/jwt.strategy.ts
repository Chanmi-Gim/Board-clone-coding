import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import * as config from 'config';

// jwt.strategy를 다른곳에서도 사용할 수 있도록 @Injectable()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), // 토큰 유효성 체크할 때 쓰는 secret text
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // auth header에서 토큰타입이 bearerToken인 토큰을 추출했다.
    });
  }

  // 위에서 토큰이 유효한지 체크되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에서 있는 유저인지 확인후 있다면 유저객체를 return 해준다.
  // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어간다.
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
