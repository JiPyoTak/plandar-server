import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { HttpExceptionFilter } from '@/common/http-exception.filter';
import { SuccessInterceptor } from '@/common/success.interceptor';

import { AppModule } from './app.module';

const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    authAction: {
      defaultBearerAuth: {
        name: 'defaultBearerAuth',
        schema: {
          description: 'Default',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        value:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5OTkyMzE2LCJleHAiOjE5OTU1NjgzMTZ9.aKtmtPBeFpOo6yxkU3403niWAzxI_ztu1_dPNY_pRo0',
      },
    },
  },
};

async function bootstrap() {
  // transactional
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.setGlobalPrefix('api');

  // cors
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
    .setVersion('1.0.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .addSecurityRequirements('defaultBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(PORT || 4000);
}

bootstrap();
