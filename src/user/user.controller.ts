import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get() // TypeScript decorator (Method decorator)
  all() {
    // all function
    return ['users'];
  }
}
