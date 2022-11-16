import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MsService } from 'src/services/ms.services';
import { MsContragentsService } from 'src/services/msContragents.services';
import { MomentService } from './../services/moment.services';
import { CronService } from './Cron.services';
import { MoyskladController } from './moysklad.controller';
import { MoyskladService } from './moysklad.service';
import { Profit, ProfitSchema } from './schemas/moysklad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profit.name, schema: ProfitSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [MoyskladController],
  providers: [
    MoyskladService,
    MomentService,
    MsService,
    MsContragentsService,
    CronService,
  ],
})
export class MoyskladModule {}
