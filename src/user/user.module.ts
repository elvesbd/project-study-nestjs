import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware';
import { UsersController } from './user.controller';
import { UsersServices } from './user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersServices],
  exports: [UsersServices],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, Cors(), helmet())
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(UsersController);
  }
}
