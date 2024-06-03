import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';
import { Libro } from 'src/libros/entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autore, Libro])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
