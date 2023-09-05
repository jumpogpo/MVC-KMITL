import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerTheme } from 'swagger-themes';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MVC API')
    .setDescription('This is the API document for MVC exams.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme('v3');

  SwaggerModule.setup('docs', app, document, {
    customCss: theme.getBuffer('dark'),
  });

  await app.listen(port);

  Logger.log(` 🎄 🎄 🎄 Swagger document on: http://localhost:${port}/docs`);
  Logger.log(
    ` 🚀 🚀 🚀 Application is running on: http://localhost:${port}/api`,
  );
}
bootstrap();
