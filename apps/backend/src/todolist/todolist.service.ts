import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList } from './todolist.schema';
import { Model } from 'mongoose';
import { CreateTodolistItemDto, UpdateTodolistItemDto } from './dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TodolistService {
  constructor(@InjectModel(TodoList.name) private readonly todoModel: Model<TodoList>) {}

  create(createTodolistDto: CreateTodolistDto) {
    return this.todoModel.create(createTodolistDto);
  }

  addItem(listId: string, todoItem: CreateTodolistItemDto) {
    return this.todoModel
      .findByIdAndUpdate(listId, { $push: { items: { id: randomUUID(), date: Date.now(), ...todoItem } } })
      .exec();
  }

  async createItem(id: string, createTodolistItemDto: CreateTodolistItemDto) {
    const list = await this.todoModel.findById(id);
    list.items.push({ id: randomUUID(), date: Date.now(), ...createTodolistItemDto });
    return await list.save();
  }

  find(page = 1, limit = 10) {
    return this.todoModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  update(id: string, updateTodolistDto: UpdateTodolistDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodolistDto, { new: true }).exec();
  }

  async updateItem(id: string, updateTodolistItemDto: UpdateTodolistItemDto) {
    const list = await this.todoModel.findById(id).exec();
    const foundIndex = list.items.findIndex((item) => item.id === updateTodolistItemDto.id);
    if (foundIndex === -1) {
      throw new NotFoundException('Item not found');
    }
    list.items[foundIndex].title = updateTodolistItemDto.title;
    list.items[foundIndex].detail = updateTodolistItemDto.detail;
    return await list.save();
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }

  removeItem(id: string, itemId: string) {
    return this.todoModel.findByIdAndUpdate(id, { $pull: { items: { id: itemId } } }).exec();
  }
}
