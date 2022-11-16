import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profit, ProfitDocument } from './schemas/moysklad.schema';

@Injectable()
export class MoyskladService {
  constructor(
    @InjectModel(Profit.name) private profitModel: Model<ProfitDocument>,
  ) {}

  async getAllProfit() {
    try {
      const profits = await this.profitModel.find();

      return profits;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}