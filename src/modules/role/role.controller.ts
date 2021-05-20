import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HasPermission } from '../permisson/has-permission.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @HasPermission('roles')
  async all() {
    return this.roleService.all(['permissions']);
  }

  @Post()
  @HasPermission('roles')
  async create(
    @Body('name') name: string,
    @Body('permissions') permissionIds: number[],
  ) {
    return this.roleService.create({
      name,
      permissions: permissionIds.map((id) => ({ id })),
    });
  }

  @Get(':id')
  @HasPermission('roles')
  async get(@Param('id') id: number) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') permissionIds: number[],
  ) {
    await this.roleService.update(id, {
      name,
    });
    const role = await this.roleService.findOne({ id });

    return this.roleService.create({
      ...role,
      permissions: permissionIds.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  @HasPermission('roles')
  async delete(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
