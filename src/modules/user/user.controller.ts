import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  async all(@Query('page') page: number, @Query('take') take: number) {
    // return this.userServices.all();
    return this.userServices.paginate(page, take, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const { first_name, last_name, email, role_id } = body;
    const password = await bcrypt.hash('1234', 12);
    return this.userServices.create({
      first_name,
      last_name,
      email,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userServices.findOne({ id }, ['role']);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;

    await this.userServices.update(id, { ...data, role: { id: role_id } });
    return this.userServices.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userServices.delete(id);
  }
}
