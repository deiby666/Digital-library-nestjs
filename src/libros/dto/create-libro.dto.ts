import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;    

    @IsNumber()
    @IsNotEmpty()
    autorId: number;    
}
