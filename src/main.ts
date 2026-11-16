import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Museum API')
    .setDescription(
      'Учебный REST API для управления музеями, выставками и артефактами',
    )
    .setVersion('1.0')
    .addTag('Музеи')
    .addTag('Выставки')
    .addTag('Артефакты')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port);
  console.log(`Приложение запущено: http://localhost:${port}`);
  console.log(`Swagger-документация: http://localhost:${port}/api/docs`);
}

void bootstrap();
