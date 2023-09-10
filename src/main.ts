// Import Library ทั้งหมดที่ใช้
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerTheme } from 'swagger-themes';

async function bootstrap() {
  // ตั้ง Port เป็น 3000 หรือ ที่ตั้งไว้ใน .env
  const port = process.env.PORT || 3000;

  // ตั้งค่า App โดย Set Path ของ Api และตั้งค่าให้ใช้ ValidationPipe
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // ตั้งค่า Swagger UI
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MVC API')
    .setDescription('This is the API document for MVC exams.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // สร้าง Swagger UI จาก Config ที่ตั้งไว้
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme('v3');

  // Set Path ของ Swagger UI เป็น docs และปรับ Theme Dark
  SwaggerModule.setup('docs', app, document, {
    customCss: theme.getBuffer('dark'),
  });

  // ให้ Nestjs เปิดตามที่ port ถูกตั้งไว้
  await app.listen(port);

  Logger.log(
    ` 📔 📔 📔 Swagger document on: http://localhost:${port}/docs`
  );
  Logger.log(
    ` 🚀 🚀 🚀 Application is running on: http://localhost:${port}/api`,
  );
}

// เรียกใช้ Function bootstrap();
bootstrap();
