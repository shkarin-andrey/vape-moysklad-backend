import { Controller, Get } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';

@Controller('api')
export class MoyskladController {
  constructor(private readonly moyskladService: MoyskladService) {}

  @Get('moysklad')
  async getProfits() {
    const profits = await this.moyskladService.getAllProfit();

    return profits;
  }
}
