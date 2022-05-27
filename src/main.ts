import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // stripping elements not defined in DTO
  }
  )
  )  //add this for using validation pipes

  console.log("go to 3000")
  await app.listen(3000);
}
bootstrap();
