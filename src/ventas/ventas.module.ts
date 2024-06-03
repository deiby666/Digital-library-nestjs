import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from 'src/libros/entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Libro])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
