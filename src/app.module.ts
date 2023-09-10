import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VemoxModule } from './vemox/vemox.module';

@Module({
  // Import Module ที่ต้องใช้คือจะเป็นตัว Mongoose กับ VemoxModule
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    VemoxModule
  ],
})
export class AppModule {}
