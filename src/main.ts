import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { HttpExceptionFilter } from '@/common/filters';
import { SuccessInterceptor } from '@/common/interceptors';

import { AppModule } from './app.module';

const getSwaggerOptions = (token: string) => ({
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
        value: token,
      },
    },
  },
});

async function bootstrap() {
  // transactional
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const CLIENT_URL = configService.get('CLIENT_URL');
  const TOKEN_STUB = configService.get('TOKEN_STUB');

  // cors
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
  SwaggerModule.setup('api', app, document, getSwaggerOptions(TOKEN_STUB));

  await app.listen(PORT || 4000);
}

bootstrap();
