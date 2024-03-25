import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false, id: false, versionKey: false })
export class TodoItem {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  detail?: string;

  @Prop()
  date: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);

@Schema()
export class TodoList {
  @Prop()
  title: string;

  @Prop({ type: [TodoItemSchema], default: [] })
  items: TodoItem[];
}

export type TodoListWithId = TodoList & { _id: Types.ObjectId | string };

export type TodoListDocument = HydratedDocument<TodoList>;

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
