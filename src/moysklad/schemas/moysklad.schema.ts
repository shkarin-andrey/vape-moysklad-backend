import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfitDocument = HydratedDocument<Profit>;

@Schema()
export class Profit {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 0 })
  salesAmount: number;

  @Prop({ type: String, default: '' })
  stateName: string;

  @Prop({ type: Number, default: 0 })
  marginMonth0: number;

  @Prop({ type: Number, default: 0 })
  marginMonth1: number;

  @Prop({ type: Number, default: 0 })
  marginMonth2: number;

  @Prop({ type: Number, default: 0 })
  marginMonth3: number;

  @Prop({ type: Number, default: 0 })
  marginMonth4: number;

  @Prop({ type: Number, default: 0 })
  marginMonth5: number;

  @Prop({ type: Number, default: 0 })
  sumMonth0: number;

  @Prop({ type: Number, default: 0 })
  sumMonth1: number;

  @Prop({ type: Number, default: 0 })
  sumMonth2: number;

  @Prop({ type: Number, default: 0 })
  sumMonth3: number;

  @Prop({ type: Number, default: 0 })
  sumMonth4: number;

  @Prop({ type: Number, default: 0 })
  sumMonth5: number;
}

export const ProfitSchema = SchemaFactory.createForClass(Profit);
