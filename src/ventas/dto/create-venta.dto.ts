import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
    @IsString()
    @IsNotEmpty()
    precioTotal: string;

    @IsInt()
    @IsNotEmpty()
    idLibro: number;
}
