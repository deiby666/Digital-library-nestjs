import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { Libro } from './entities/libro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from 'src/autores/autores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
