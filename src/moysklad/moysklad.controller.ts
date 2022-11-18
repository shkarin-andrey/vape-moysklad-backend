import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { UpdateProfitDto } from './dto/update-profit.dto';
import { MoyskladService } from './moysklad.service';

@Controller('api')
export class MoyskladController {
  constructor(private readonly moyskladService: MoyskladService) {}

  @Get('moysklad')
  async getProfits(@Query() stateName: UpdateProfitDto['stateName']) {
    console.log(stateName);

    const profits = await this.moyskladService.getAllProfit(stateName);

    return profits;
  }
}
