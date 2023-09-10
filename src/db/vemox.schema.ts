// สร้าง Schema เอาไว้สำหรับใช้เก็บข้อมูลในฐานข้อมูล
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VemoxData = VemoxModel & Document;

@Schema({ collection: 'Vemox', versionKey: false })
export class VemoxModel {
    // กำหนดว่า Schema นี้ควรมีค่าอะไรบ้าง ในที่นี้มีค่า
    // type, query, result, execution_time
    @Prop({ required: true })
    type: string

    @Prop({ required: true })
    query: string

    @Prop({ required: true })
    result: number

    @Prop({ required: true, type: Number })
    execution_time: number
}

export const VemoxSchema = SchemaFactory.createForClass(VemoxModel);