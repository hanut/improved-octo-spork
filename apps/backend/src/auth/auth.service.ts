import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface JwtTokenPayload {
  uid: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<string> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException();

    if (user.password !== pass) throw new UnauthorizedException();

    const payload: JwtTokenPayload = { uid: user._id.toHexString(), username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
