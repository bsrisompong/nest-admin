import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule), CommonModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
