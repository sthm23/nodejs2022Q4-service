import { UsersMiddleware } from './users.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST },
        { path: 'user/:id', method: RequestMethod.PUT },
        { path: 'user/:id', method: RequestMethod.DELETE },
      );
  }
}
