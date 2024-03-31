import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: { signIn: jest.fn() },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    mockAuthService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /signIn', () => {
    it('should exist', () => {
      expect(controller.signIn).toBeDefined();
    });

    it('should return unauthorized if auth fails', async () => {
      const _mockSignIn = jest.spyOn(mockAuthService, 'signIn');
      _mockSignIn.mockImplementation(() => Promise.reject(new UnauthorizedException()));

      const signInDto = { username: 'testUser', password: 'bad-password' };
      expect(() => controller.signIn(signInDto)).rejects.toThrow(UnauthorizedException);

      expect(_mockSignIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
    });

    it('should return a token if auth succeeds', async () => {
      const testToken = 'test-token';
      const _mockSignIn = jest.spyOn(mockAuthService, 'signIn');
      _mockSignIn.mockImplementation(() => Promise.resolve(testToken));
      const signInDto = { username: 'testUser', password: 'test-password' };
      const token = await controller.signIn(signInDto);
      expect(token).toBe(testToken);
      expect(_mockSignIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
    });
  });
});
