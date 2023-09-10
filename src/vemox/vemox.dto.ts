import { ApiProperty } from '@nestjs/swagger';

// สร้าง DTO โดยใช้ชื่อว่า VenoxInputDto โดยต้องมีค่า language และ command
export class VemoxInputDto {
    @ApiProperty({ default: 'SQL', required: true })
    language: string;

    @ApiProperty({ required: true })
    command: string;
}