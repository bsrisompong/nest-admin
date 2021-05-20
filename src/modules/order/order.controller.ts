import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('')
  async all(@Query('page') page = 1, take = 10) {
    // return this.orderService.all(['order_items']);
    return this.orderService.paginate(page, take, ['order_items']);
  }

  // TODO : create OrderCreateDto
  @Post()
  async create(@Body() body): Promise<Order> {
    return this.orderService.create(body);
  }
}
