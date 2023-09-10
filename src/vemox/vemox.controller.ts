import { Body, Controller, Post } from '@nestjs/common';
import { VemoxService } from './vemox.service';
import { VemoxInputDto } from './vemox.dto';

// ตั้งค่าให้ Path ของตัวนี้คือ vemox ก็จะเป็น localhost:3000/api/vemox
@Controller('vemox')
export class VemoxController {
  constructor(private readonly vemoxService: VemoxService) {}

  // แสดงผล Vemox ในรูปแบบข้อความธรรมดา
  // โดยตั้งค่า Path ของอันนี้เป็น localhost:3000/api/vemox/normal
  // โดยเมื่อ API ถูกเรียกมาแล้วก็จะทำการเรียกใช้ vemoxService เพื่อเรียกใช้ Function vemoxNormal ต่อไปและ return ค่ากลับ
  @Post('/normal')
  async vemoxNormal(@Body() body: VemoxInputDto) {
    return await this.vemoxService.vemoxNormal(body);
  }

  // แสดงผล Vemox ในรูปแบบ Json
  // โดยตั้งค่า Path ของอันนี้เป็น localhost:3000/api/vemox/json
  // โดยเมื่อ API ถูกเรียกมาแล้วก็จะทำการเรียกใช้ vemoxService เพื่อเรียกใช้ Function vemoxJson ต่อไปและ return ค่ากลับ
  @Post('/json')
  async vemoxJson(@Body() body: VemoxInputDto) {
    return await this.vemoxService.vemoxJson(body);
  }
}
