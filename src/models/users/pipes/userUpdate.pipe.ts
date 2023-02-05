import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class UserUpdValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException('Wrong Property', HttpStatus.BAD_REQUEST);
      // throw new HttpException('Wrong Property', HttpStatus.FORBIDDEN);
    }
    return value;
  }
}
