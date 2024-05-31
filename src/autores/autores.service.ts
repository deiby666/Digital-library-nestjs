import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { Autore } from './entities/autore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>,
  ) { }

  async create(createAutoreDto: CreateAutoreDto): Promise<Autore> {
    return this.autorRepository.save(createAutoreDto);
  }

  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Autore[]> {
    const skip = (page - 1) * limit;
    return this.autorRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.autorRepository.findOne({
      where: { id },
      select: {
        id: true,
        nombre: true,
      },
    });
  }

  async findOneWithBooks(id: number): Promise<Autore> {
    const autor = await this.autorRepository.findOne({
      where: { id },
      relations: ['Libros'],
    });
    console.log(autor);
    

    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return autor;
  }

  async update(id: number, updateAutoreDto: UpdateAutoreDto): Promise<Autore> {
    const result = await this.autorRepository.update(id, updateAutoreDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    const dataUpdated = this.autorRepository.findOneBy({ id })
    return dataUpdated
  }

  async remove(id: number): Promise<{ message: String }> {
    const result = await this.autorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return {
      message: "autor deleted successfully"
    }
  }
}
