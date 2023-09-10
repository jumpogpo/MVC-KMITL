import { Module } from '@nestjs/common';
import { VemoxService } from './vemox.service';
import { VemoxController } from './vemox.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { VemoxModel, VemoxSchema } from 'src/db/vemox.schema';

@Module({
  // Import Module ที่ใช้ในที่นี้คือ Mongoose โดยจะใช้ Schema ที่เราได้ทำไว้ในไฟล์ db/vemox.schema.ts
  imports: [
    MongooseModule.forFeature([
      {
        name: VemoxModel.name, // ตั่งชื่อ Collection ของ MongoDB
        schema: VemoxSchema, // กำหนดว่าใช้ Schema ตามไฟล์ที่สร้างไว้คือไฟล์ db/vemox.schema.ts
      },
    ]),

  ],
  controllers: [VemoxController], // กำหนดว่า Module นี้ใช้ Controllers อะไรในที่นี้คือ VemoxController จากไฟล์ vemox.controller.ts
  providers: [VemoxService], // กำหนดว่า Module นี้ใช้ Providers อะไรในที่นี้คือ VemoxService จากไฟล์ vemox.service.ts
})

// Export ออกในชื่อ VemoxModule
export class VemoxModule {} 
