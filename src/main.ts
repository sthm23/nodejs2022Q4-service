import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import * as yaml from 'js-yaml';
import { MyLogger } from './models/logger/myloger.service';
import { HttpExceptionFilter } from './models/logger/http-exeption.filter';
// import { logger } from './models/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(MyLogger)
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;

  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();

// process.on('unhandledRejection', (reason, promise) => {
//   logger(`${promise}, ${reason}`, '','ERROR');
// });

// process.on('uncaughtException', (err, origin) => {
//   logger( `${err}` + `${origin}`, '', 'ERROR');
// });