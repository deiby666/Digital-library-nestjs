import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutoreDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
