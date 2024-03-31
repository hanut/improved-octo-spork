import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { CreateTodolistDto } from './dto';
import { TodoList, TodoListDocument, TodoListSchema } from './todolist.schema';
import { TodolistService } from './todolist.service';

describe('TodolistService', () => {
  let service: TodolistService;
  let mockUserModel: Partial<Model<User>>;
  let mockTodoModel: Partial<Model<TodoList>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {} as Model<User>,
        },
        {
          provide: getModelToken(TodoList.name),
          useValue: mongoose.model(TodoList.name, TodoListSchema),
        },
        TodolistService,
      ],
    }).compile();

    service = module.get<TodolistService>(TodolistService);
    mockUserModel = module.get<Partial<Model<User>>>(getModelToken(User.name));
    mockTodoModel = module.get<Partial<Model<TodoList>>>(getModelToken(TodoList.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the create method of the TodoList model', async () => {
      const title = 'testListTitle';
      const testListDto: CreateTodolistDto = { title };
      const _create = jest.spyOn(mockTodoModel, 'create');
      _create.mockImplementation((createDto: CreateTodolistDto) => Promise.resolve([{} as TodoListDocument]));

      const res = await service.create(testListDto);
      expect(res).toBeDefined();
      expect(_create).toHaveBeenCalledWith(testListDto);
    });
  });
});
