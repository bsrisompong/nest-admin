import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  all() {
    return this.userServices.all();
  }
}
