import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from './myloger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    // constructor(private readonly logger: MyLogger) {}
    logger = new Logger('HTTP')
    
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { message, stack } = exception;
    this.logger.error(message, stack);

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}