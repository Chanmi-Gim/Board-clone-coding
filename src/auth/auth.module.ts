import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 유저를 인증하기 위해 사용할 기본 strategy 명시
    JwtModule.register({
      // jwt 인증 부분을 담당. 주로 sign()을 위한 부분이다.
      secret: process.env.JWT_SECRET || jwtConfig.secret, // 토큰 생성시 사용하는 secret text
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy], // Auth 모듈에서 사용할 수 있도록 등록
  exports: [JwtStrategy, PassportModule], // 다른 모듈에서 사용할 수 있도록 등록
})
export class AuthModule {}
