import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
