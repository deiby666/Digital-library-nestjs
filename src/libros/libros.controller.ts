import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.librosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.librosService.findOne(+id);
  }

  @Get('venta/:id')
  @HttpCode(HttpStatus.OK)
  async findOneWithBooks(@Param('id') id: string): Promise<Libro> {
    const ventas = await this.librosService.findVentasByBook(+id);
    if (!ventas) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    return ventas;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}
