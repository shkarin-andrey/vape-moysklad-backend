import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MsService } from 'src/services/ms.services';
import { Profit, ProfitDocument } from './schemas/moysklad.schema';

@Injectable()
export class MoyskladService {
  constructor(
    @InjectModel(Profit.name) private profitModel: Model<ProfitDocument>,
    private readonly msService: MsService,
  ) {}

  async getAllProfit(stateName) {
    try {
      const profits = await this.profitModel.find(stateName);

      return profits;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllStatus() {
    try {
      // const statuses = this.msService.ms().GET('entity/counterparty/metadata');
      const profits = await this.profitModel.find({}, { stateName: 1, _id: 0 });

      const arrProfits = profits.map((item) => item.stateName);
      const uniqueProfits = [...new Set(arrProfits)];

      return uniqueProfits;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
