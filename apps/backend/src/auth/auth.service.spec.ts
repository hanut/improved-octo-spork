import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UsersService>;
  let mockJwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          //Mock the user model
          provide: getModelToken('User'),
          useValue: {} as Model<User>,
        },
        {
          provide: UsersService,
          useValue: {
            findByUsername: async () => ({}) as UserDocument,
          },
        },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    mockUserService = module.get<UsersService>(UsersService);
    mockJwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should exist', () => {
      expect(service.signIn).toBeDefined();
    });

    it('should throw an error if user does not exist', async () => {
      const testUser = 'badUser';
      const pass = 'testpass';

      const _findByUsername = jest.spyOn(mockUserService, 'findByUsername');
      _findByUsername.mockImplementation(async (username: string) => null); // return null because user does not exist

      expect(() => service.signIn(testUser, pass)).rejects.toThrow('Unauthorized');
      expect(mockUserService.findByUsername).toHaveBeenCalledWith(testUser);
    });

    it('should return a token', async () => {
      const testUser = 'goodUser';
      const pass = 'testpass';
      const testToken = 'test-token';

      const _findByUsername = jest.spyOn(mockUserService, 'findByUsername');
      // return a valid UserDocument when findByUsername is called
      _findByUsername.mockImplementation(
        async (username: string) => ({ username, password: pass, _id: new Types.ObjectId() }) as UserDocument,
      );

      const _signAsync = jest.spyOn(mockJwtService, 'signAsync');
      _signAsync.mockImplementation(async () => testToken);

      const token = await service.signIn(testUser, pass);
      expect(token).toBeDefined();
      expect(token).toEqual(testToken);
    });
  });
});
