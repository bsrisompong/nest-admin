import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  async all() {
    return await this.userServices.all();
  }
}
