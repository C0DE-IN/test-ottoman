import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Database } from './database';
import { UserSchema } from './user/user.model'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const database = app.get<Database>(Database);
  await database.connectOttoman('user', 'user', UserSchema, 'User');
  await app.listen(3000);
}
bootstrap();
