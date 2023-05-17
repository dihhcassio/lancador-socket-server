import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppVersion } from './app.version';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  const showSwagger = configService.get('SWAGGER_SHOW');
  if (showSwagger === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Camaleão Lançador Socket Server example')
      .setDescription('The Camaleão Camaleão Lançador API description')
      .setVersion(AppVersion.Version)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.get('PORT'));
}
bootstrap();
