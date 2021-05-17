import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissonController } from './permisson.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissonController],
  providers: [PermissionService],
})
export class PermissonModule {}
