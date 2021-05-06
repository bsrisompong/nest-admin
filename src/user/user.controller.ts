import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-craete.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    // return await this.userServices.all();
    return this.userServices.all();
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const { first_name, last_name, email } = body;
    const password = await bcrypt.hash('1234', 12);
    return this.userServices.create({ first_name, last_name, email, password });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userServices.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return this.userServices.update(id, body);
  }
}
