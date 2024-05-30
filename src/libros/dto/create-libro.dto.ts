import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;    

    @IsNumber()
    @IsNotEmpty()
    id_libro: number;

    @IsNumber()
    @IsNotEmpty()
    id_venta: number;
}
