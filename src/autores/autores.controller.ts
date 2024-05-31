import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { Autore } from './entities/autore.entity';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAutoreDto: CreateAutoreDto) {
    return this.autoresService.create(createAutoreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.autoresService.findOne(+id);
  }

  @Get('autor/:id')
  @HttpCode(HttpStatus.OK)
  async findOneWithBooks(@Param('id') id: string): Promise<Autore> {
    const autor = await this.autoresService.findOneWithBooks(+id);
    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    return autor;
  }


  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateAutoreDto: UpdateAutoreDto) {
    return this.autoresService.update(+id, updateAutoreDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
