import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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

    const payload = { uid: user._id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
