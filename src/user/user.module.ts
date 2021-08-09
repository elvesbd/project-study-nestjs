import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersServices } from './user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersServices],
  exports: [UsersServices],
})
export class UserModule {}
