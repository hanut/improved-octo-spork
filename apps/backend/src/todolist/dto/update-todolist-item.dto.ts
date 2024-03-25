import { PartialType } from '@nestjs/mapped-types';
import { CreateTodolistItemDto } from './create-todolist-item.dto';

export class UpdateTodolistItemDto extends PartialType(CreateTodolistItemDto) {
  id: string;
}
