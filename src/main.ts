import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import runBot from './bot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

runBot()
bootstrap();
