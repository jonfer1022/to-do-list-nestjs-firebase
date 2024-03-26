import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PreAuthMiddleware } from './auth/preAuth.middelware';
import { FirebaseAdmin } from './common/firebaseAdmin.setup';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Firebase } from './common/firebase.setup';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AuthController, TasksController],
  providers: [FirebaseAdmin, AuthService, Firebase, TasksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreAuthMiddleware)
      .exclude('/auth/signup', '/auth/signin')
      .forRoutes('*');
  }
}
