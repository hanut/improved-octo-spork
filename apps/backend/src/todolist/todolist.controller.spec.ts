import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { AuthService, JwtTokenPayload } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { CreateTodolistDto } from './dto';
import { SECRET_KEY } from 'src/auth/constants';
import { TodoListDocument } from './todolist.schema';

describe('TodolistController', () => {
  let controller: TodolistController;
  let mockTodoListService: Partial<TodolistService>;
  let mockToken: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TodolistService,
          useValue: {
            create: jest.fn(),
            addItem: jest.fn(),
            createItem: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            updateItem: jest.fn(),
            remove: jest.fn(),
            removeItem: jest.fn(),
          } as unknown as TodolistService,
        },
        JwtService,
      ],
      controllers: [TodolistController],
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
    mockTodoListService = module.get<TodolistService>(TodolistService);

    const jwtPayload: JwtTokenPayload = { uid: new Types.ObjectId().toHexString(), username: 'testUser' };
    mockToken = await module.get<JwtService>(JwtService).signAsync(jwtPayload, { secret: SECRET_KEY });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a new todo list', async () => {
      const _create = jest.spyOn(mockTodoListService, 'create');
      _create.mockImplementationOnce(() => Promise.resolve({ title: 'test' } as TodoListDocument));
      const createTodolistDto: CreateTodolistDto = { title: 'test' };
      const result = await controller.create(createTodolistDto);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return an array of todo lists', async () => {
      const _find = jest.spyOn(mockTodoListService, 'find');
      _find.mockImplementationOnce(() =>
        Promise.resolve([
          { _id: new Types.ObjectId(), title: 'test1' },
          { _id: new Types.ObjectId(), title: 'test2' },
        ] as TodoListDocument[]),
      );
      const result = await controller.findAll();
      expect(result).toBeDefined();
    });
  });
});
