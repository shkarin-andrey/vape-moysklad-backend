import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule/dist';
import { Model } from 'mongoose';
import { MsContragentsService } from 'src/services/msContragents.services';
import { MomentService } from './../services/moment.services';
import { MsService } from './../services/ms.services';
import { UpdateProfitDto } from './dto/update-profit.dto';
import { Profit, ProfitDocument } from './schemas/moysklad.schema';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Profit.name) private profitModel: Model<ProfitDocument>,
    private readonly momentService: MomentService,
    private readonly msContragentsService: MsContragentsService,
    private readonly msService: MsService,
  ) {}

  @Cron('0 */10 * * * *')
  async updateAllProfit() {
    const allProfit = await this.getAll();
    const updateProfit = await this.updateAll(<UpdateProfitDto[]>allProfit);

    Logger.log(updateProfit);

    return updateProfit;
  }

  async updateAll(updateProfitDto: UpdateProfitDto[]) {
    await this.profitModel.remove();

    for await (const profit of updateProfitDto) {
      await this.profitModel.create(profit);
    }

    return { message: 'OK' };
  }

  async getAll() {
    try {
      const contragents = await this.msContragentsService.msContragents();

      const profit = [];
      const months = [0, 1, 2, 3, 4, 5];

      for await (const iterator of months) {
        const data = await this.msProfit(
          this.momentService.getStartMonth(iterator),
          this.momentService.getEndMonth(iterator),
          `sumMonth${iterator}`,
          `marginMonth${iterator}`,
        );
        profit.push(...data);
      }

      const data = this.mergeByProperty([contragents, profit], 'name').filter(
        (item) => (item as UpdateProfitDto)._id !== undefined,
      );

      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  mergeByProperty(arrays: any[], property: string) {
    const arr = arrays.flatMap((item) => item); //делаем из всех массивов - один

    const obj = arr.reduce((acc, item) => {
      return {
        // делаем из массива - объект, чтобы повторения перезаписывались
        ...acc,
        [item[property]]: { ...acc[item[property]], ...item },
      };
    }, {});

    return Object.values(obj);
  }

  async msProfit(
    momentFrom: string,
    momentTo: string,
    monthSum: string,
    monthMargin: string,
  ) {
    try {
      const profitCollection = await this.msService
        .ms()
        .GET('report/profit/bycounterparty', {
          momentFrom,
          momentTo,
        });
      const profit = profitCollection.rows.map((item: any) => {
        return {
          name: item.counterparty.name,
          [monthSum]: item.sellSum / 100,
          [monthMargin]: Math.round(item.margin * 10000) / 100,
        };
      });

      return profit;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
