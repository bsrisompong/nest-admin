import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Parser } from 'json2csv';
import { AuthGuard } from '../auth/auth.guard';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { Response } from 'express';

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

  @Post('export')
  async export(@Res() res: Response) {
    // first row
    const parser = new Parser({
      fields: ['ID', 'NAME', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.orderService.all(['order_items']);

    const json = [];

    orders.forEach((order: Order) => {
      json.push({
        ID: order.id,
        Name: order.name,
        Email: order.email,
        'Product Titles': '',
        Price: '',
        Quantity: '',
      });

      order.order_items.forEach((item: OrderItem) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Titles': item.product_title,
          Price: item.price,
          Quantity: item.quantity,
        });
      });
    });

    const csv = parser.parse(json);
    res.header('Content-type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  }
}
