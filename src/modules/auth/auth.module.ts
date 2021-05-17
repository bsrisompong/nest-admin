import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UserModule, CommonModule],
})
export class AuthModule {}
