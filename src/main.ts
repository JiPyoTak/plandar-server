import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { HttpExceptionFilter } from '@/common/http-exception.filter';
import { SuccessInterceptor } from '@/common/success.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const CLIENT_URL = configService.get('CLIENT_URL');
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Plandar API')
    .setDescription('Plandar 서비스를 위한 API 문서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 4000);
}

bootstrap();
