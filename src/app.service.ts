import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'https://brandosoft.github.io/sledzik-front/';
  }
}
