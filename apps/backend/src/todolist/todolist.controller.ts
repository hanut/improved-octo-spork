import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { CreateTodolistItemDto, UpdateTodolistItemDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodolistController {
  constructor(private readonly todoService: TodolistService) {}

  @Post()
  async create(@Body() createTodolistDto: CreateTodolistDto) {
    return await this.todoService.create(createTodolistDto);
  }

  @Get()
  async findAll() {
    return await this.todoService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodolistDto: UpdateTodolistDto) {
    return await this.todoService.update(id, updateTodolistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todoService.remove(id);
  }

  @Post(':id/items')
  async addItem(@Param('id') id: string, @Body() createTodolistItemDto: CreateTodolistItemDto) {
    await this.todoService.addItem(id, createTodolistItemDto);
  }

  @Patch(':id/items')
  async updateItem(@Param('id') id: string, @Body() updateTodolistItemDto: UpdateTodolistItemDto) {
    await this.todoService.updateItem(id, updateTodolistItemDto);
  }

  @Delete(':id/items/:itemId')
  async removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    await this.todoService.removeItem(id, itemId);
  }
}
