import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterUserInput } from './dto/filter-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Request, Response, UseGuards } from '@nestjs/common';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/')
  async createUser(@Body('createUserInput') createUserInput: CreateUserInput): Promise<CreateUserInput> {
    return this.usersService.create(createUserInput);
  }

  @Get('/')
  async users(): Promise<CreateUserInput[]> {
    return this.usersService.findAll();
  }

  @Post('/filtered')
  async userList(@Body('filters') filters: FilterUserInput): Promise<CreateUserInput[]> {
    return this.usersService.list(filters);
  }

  @Post('/:id')
  async findUser(@Param('id') id: string): Promise<CreateUserInput> {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body('updateUserInput') updateUserInput: UpdateUserInput): Promise<UpdateUserInput> {
    return this.usersService.update(id, updateUserInput);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<CreateUserInput> {
    return this.usersService.remove(id);
  }
}
