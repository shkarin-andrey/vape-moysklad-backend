import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MoyskladModule } from './moysklad/moysklad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b4zyisc.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
    ),
    MoyskladModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
