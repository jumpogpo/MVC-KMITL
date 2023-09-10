import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VemoxInputDto } from './vemox.dto';
import { VemoxData, VemoxModel } from 'src/db/vemox.schema';

@Injectable()
export class VemoxService {
  // Contrusctor ตัว Model ของ MongoDB ให้ชื่อ vemoxDataModel
  constructor(@InjectModel(VemoxModel.name) private vemoxDataModel: Model<VemoxData>) {}

  // Function vemoxNormal ถูกเรียกก็ต่อเมื่อมีการเรียก api vemox/normal เข้ามา
  // โดยจะรับค่า Body ซึ่งมีค่าตาม Dto ที่เขียนไว้คือ VemoxInputDto คือรับค่า language และ command
  async vemoxNormal(body: VemoxInputDto) {
    // เรียกใช้ Function vemox เพื่อทำการแปลงค่า Command ตามที่โจทย์กำหนดและ await เพื่อรอ
    const vemoxResult = await this.vemox(body);
    
    // เช็คว่าถ้า status นั้นมีค่าเป็น false จะ return "Wring Syntax!" กลับไป
    if (vemoxResult["status"] == false) return "Wrong Syntax!";

    // ถ้าไม่เข้าเงื่อนไขบนให้ทำการ return ค่าต่างๆกลับไปในรูปแบบข้อความธรรมดา
    return `Query: ${vemoxResult["query"]}\nResult: ${vemoxResult["result"]}\nQuery Execution Time: ${vemoxResult["execution_time"]}`
  }

  // Function vemoxJson ถูกเรียกก็ต่อเมื่อมีการเรียก api vemox/json เข้ามา
  // โดยจะรับค่า Body ซึ่งมีค่าตาม Dto ที่เขียนไว้คือ VemoxInputDto คือรับค่า language และ command
  async vemoxJson(body: VemoxInputDto) {
    // เรียกใช้ Function vemox เพื่อทำการแปลงค่า Command ตามที่โจทย์กำหนดและ await เพื่อรอ
    const vemoxResult = await this.vemox(body);

    // และ return ค่า vemoxResult กลับไป
    return vemoxResult;
  }

  // กำหนด Function vemox เป็น private และรับค่า body ที่มี Dto ตามที่เขียนไว้คือ VemoxInputDto คือรับค่า language และ command
  private async vemox(body: VemoxInputDto) {
    const startTime: number = performance.now(); // เก็บค่าเวลาของปัจจุบันเพื่อนำไปคำนวณหาเวลาการทำงาน
    const language: string = body["language"].toLowerCase(); // ปรับ language ที่รับเข้ามาเป็นตัวเล็กให้หมดและเก็บค่าใน language
    const command: string = body["command"].trim(); // ตัดเว้นวรรคหน้าหลังของ command และเก็บค่าใน command

    if (language == 'sql') { // เช็คว่าเป็นภาษา SQL มั้ย
      const sqlResult = this.handleSQL(command, startTime); // เรียกใช้ Function handleSQL เพื่อคำนวณหาผลลัพธ์

      if (sqlResult["status"] == false) return { status: false } // ถ้า Status เป็น False จะทำการ return { status: false } กลับ

      return sqlResult; // Return ข้อมูลจาก sqlResult กลับ
    } else if (language == 'mql') { // เช็คว่าเป็นภาษา mql มั้ย
      const mqlResult = this.handleMQL(command, startTime); // เรียกใช้ Function handleMQL เพื่อคำนวณหาผลลัพธ์

      if (mqlResult["status"] == false) return { status: false } // ถ้า Status เป็น False จะทำการ return { status: false } กลับไป

      return mqlResult; // return ผลลัพธ์ของ mqlResult กลับไป
    } else { // ถ้าไม่เข้าเงื่อนไขบนให้ทำการทำงานตามข้างล่าง
      return { status: false } // return { status: false } กลับไป
    }
  }

  // สร้าง Function handleSQL เป็น private เพื่อทำการแปลงผลลัพธ์ของ SQL
  private async handleSQL(command: string, startTime: number) {
    // กำหนด Pattern ที่ถูกเพื่อนำไปเช็คตอนรับ command เข้ามา
    const sqlPattern = /^SELECT \d+(\s+\+\s+\d+)?;$/i;

    // เช็คว่าถ้า Pattern ไม่ตรงให้ return { status: false } กลับไป
    if (!sqlPattern.test(command)) return { status: false }
    
    // เก็บค่าเวลาปัจจุบันไว้เพื่อนำไปหาเวลาในการทำงาน
    const endTime: number = performance.now();
    const resultData = {
      query: command,
      result: eval(command.split("SELECT ")[1].slice(0, -1)),
      execution_time: endTime - startTime // คำนวณหาเวลาทำงานโดยใช้ endTime - startTime
    } // สร้างตัวแปรเก็บค่าผลลัพธ์เอาไว้
    const vemoxData = new this.vemoxDataModel({type: 'SQL', ...resultData}); // สร้างข้อมูลลง Database
    await vemoxData.save() // Save ลง Database

    return { status: true, ...resultData }; // return ค่ากลับไป
  }

  private async handleMQL(command: string, startTime: number) {
    // กำหนด Pattern ของ command ที่รับเข้ามา
    const mqlPattern = /^print\(\d+( \+ \d+)?\);$/;

    // ถ้า Command ที่รับเข้ามามี Pattern ไม่ตรงให้ return { status: false } กลับไป
    if (!mqlPattern.test(command)) return { status: false };

    // เก็บค่า endTime คือเวลาปัจจุบันเพื่อนำไปคำนวณหาเวลาในการทำงาน
    const endTime: number = performance.now();
    
    // Return ค่ากลับไปในรูปแบบ Json
    return {
      status: true,
      query: command,
      result: eval(command.match(/print\(([^)]+)\)/)[1]),
      execution_time: endTime - startTime
    };
  }
}
