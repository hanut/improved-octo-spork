import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { SECRET_KEY } from './constants';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(AuthGuard).toBeDefined();
  });

  it('instances of AuthGuard should have a canActivate method', () => {
    const authGuard = new AuthGuard({} as JwtService);
    expect(authGuard.canActivate).toBeDefined();
  });

  it('canActivate should return true if token is valid', async () => {
    const testToken = 'test-token';
    const verifyAsync = jest.fn(() => Promise.resolve(true));
    const _jwtService = {
      verifyAsync,
    } as unknown as JwtService;
    const authGuard = new AuthGuard(_jwtService);

    const context = {
      switchToHttp: () =>
        ({
          getRequest: () => ({
            headers: {
              authorization: `Bearer ${testToken}`,
            },
          }),
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const canActivate = await authGuard.canActivate(context);

    expect(canActivate).toBe(true);

    expect(verifyAsync).toHaveBeenCalledWith(testToken, { secret: SECRET_KEY });
  });
});
