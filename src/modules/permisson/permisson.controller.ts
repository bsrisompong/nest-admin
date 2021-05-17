import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
@Controller('permission')
export class PermissonController {
  constructor(private permisisonService: PermissionService) {}

  @Get()
  async all() {
    return this.permisisonService.all();
  }
}
