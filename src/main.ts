import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  // const config = new DocumentBuilder()
  //   .setTitle('NODEJS2022Q4-service')
  //   .setDescription('Home music library service')
  //   .setVersion('1.0')
  //   .addTag('Users')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
