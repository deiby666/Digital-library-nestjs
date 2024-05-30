import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autore } from './entities/autore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autore])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
