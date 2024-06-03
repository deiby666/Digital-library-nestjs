import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, NotFoundException, UseGuards } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { validateHour } from './guards/validateHour.guard';


@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(validateHour)
  create(@Body() createVentaDto: CreateVentaDto) { 
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ventasService.remove(+id);
  }
}
