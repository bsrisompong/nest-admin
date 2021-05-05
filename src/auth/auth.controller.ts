import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotFoundException,
  Res,
  Req,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
// import { AuthInterceptor } from './auth.interceptor';
// bcrypt.hash('asdasd213', 12).then((result) => console.log(result));
// // $2a$12$wVao9W0fkkgtSs8s/VEbEOMFji76t4p8t8t/3ozx9ghADgtVbsM82
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password do not match!');
    }

    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({ ...body, password: hashed });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    const user = await this.userService.findOne({ email });

    // User not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Incorrect password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    return this.userService.findOne({ id: data.id });
  }
}
