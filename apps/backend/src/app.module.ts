import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI') || 'mongodb://localhost:27017',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TodolistModule,
    AuthModule,
  ],
})
export class AppModule {}
