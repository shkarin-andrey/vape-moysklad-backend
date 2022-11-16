import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';
import * as MoyskladCore from 'moysklad';
import * as MoyskladQueue from 'moysklad-extension-queue';

@Injectable()
export class MsService {
  ms() {
    const Moysklad = MoyskladCore.compose(MoyskladQueue);

    const sklad = Moysklad({
      token: process.env.MOYSKLAD_TOKEN,
      apiVersion: '1.2',
      queue: true,
    });

    return sklad;
  }
}
