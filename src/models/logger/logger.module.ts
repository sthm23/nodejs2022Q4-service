import { Module } from '@nestjs/common';
import { MyLogger } from './myloger.service';

@Module({
  providers: [MyLogger,],
  exports: [MyLogger],
})
export class LoggerModule {}