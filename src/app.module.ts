import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './modules/role/role.module';
import { PermissonModule } from './modules/permisson/permission.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    UserModule,
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      // entities: [],
      autoLoadEntities: true,
      // ^ don't use the same produution environment because it will always migrate databases.
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissonModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
