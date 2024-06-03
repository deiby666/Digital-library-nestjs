import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import cluster from 'cluster';
import { Client } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

  ) { }

  async create(CreateClienteDto: CreateClienteDto): Promise<Client> {
    return this.clientRepository.save(CreateClienteDto);
  }

  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Client[]> {
    const skip = (page - 1) * limit;
    return this.clientRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.clientRepository.findOne({
      where: { id },
      select: {
        id: true,
        nombre: true,
      },
    });
  }

  async findVentasByBook(id: number): Promise<Client> {
    const autor = await this.clientRepository.findOne({
      where: { id },
      relations: ['ventas'],
    });

    console.log(autor);
    

    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return autor;
  }


  async update(id: number, UpdateClienteDto: UpdateClienteDto): Promise<Client> {
    const result = await this.clientRepository.update(id, UpdateClienteDto);
    if (result.affected === 0) {
      throw new NotFoundException(`libro con ID ${id} no encontrado`);
    }

    const dataUpdated = this.clientRepository.findOneBy({ id })
    return dataUpdated
  }


  async remove(id: number): Promise<{ message: String }> {
    const result = await this.clientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`libro con ID ${id} no encontrado`);
    }

    return {
      message: "libro deleted successfully"
    }
  }
}
