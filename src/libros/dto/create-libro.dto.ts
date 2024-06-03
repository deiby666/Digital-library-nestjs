import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;    

    @IsInt()
    @IsNotEmpty()
    authorId: number;    
}
