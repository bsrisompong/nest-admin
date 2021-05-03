import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('register')
  async register(@Body() body) {
    return body;
  }
}
