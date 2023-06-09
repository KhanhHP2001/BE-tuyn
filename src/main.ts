import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: {
    origin: "*",
    credentials: true,
  } });

  const config = new DocumentBuilder()
    .setTitle('Money Management APIs')
    .setDescription('Money manager API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2()
    .build(); 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
