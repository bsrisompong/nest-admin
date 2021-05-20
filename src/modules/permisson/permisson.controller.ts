import { Controller, Get } from '@nestjs/common';
// import { HasPermission } from './has-permission.decorator';
import { PermissionService } from './permission.service';
@Controller('permissions')
export class PermissonController {
  constructor(private permisisonService: PermissionService) {}

  @Get()
  // @HasPermission('view_permissions')
  async all() {
    return this.permisisonService.all();
  }
}
