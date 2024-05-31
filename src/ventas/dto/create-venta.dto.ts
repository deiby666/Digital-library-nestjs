import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
    @IsString()
    @IsNotEmpty()
    precioTotal: string;

    @IsNumber()
    @IsNotEmpty()
    idLibro: number;
}
