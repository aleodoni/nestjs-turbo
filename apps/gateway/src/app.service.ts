import { Injectable } from '@nestjs/common';
import {right} from 'shared-libs'

@Injectable()
export class AppService {
  getHello(): string {
    const r = right;
    return 'Hello World!';
  }
}
