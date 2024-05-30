import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;    

    @IsNumber()
    @IsNotEmpty()
    precioTotal: number;

    @IsNumber()
    @IsNotEmpty()
    id_libro: number;
}
