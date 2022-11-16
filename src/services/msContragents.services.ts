import { Injectable } from '@nestjs/common';
import { MsService } from './ms.services';

@Injectable()
export class MsContragentsService {
  constructor(private readonly msService: MsService) {}

  async msContragents() {
    const contragents = [];

    const productsCollection = await this.msService
      .ms()
      .GET('entity/counterparty');

    for await (const item of productsCollection.rows) {
      const contragentsState = await this.msContragentsState(
        item.state.meta.href,
      );

      contragents.push({
        _id: item.id,
        name: item.name,
        salesAmount: item.salesAmount,
        stateName: contragentsState.name || '',
        marginMonth0: 0,
        marginMonth1: 0,
        marginMonth2: 0,
        marginMonth3: 0,
        marginMonth4: 0,
        marginMonth5: 0,
        sumMonth0: 0,
        sumMonth1: 0,
        sumMonth2: 0,
        sumMonth3: 0,
        sumMonth4: 0,
        sumMonth5: 0,
      });
    }

    return contragents;
  }

  async msContragentsState(url: string) {
    try {
      const profitCollection = await this.msService.ms().GET(url);

      return profitCollection;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
