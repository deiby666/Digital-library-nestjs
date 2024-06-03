import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { Autore } from './entities/autore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from 'src/libros/entities/libro.entity';


@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>,

    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
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
    const autor = await this.autorRepository.createQueryBuilder('autor')
        .leftJoinAndSelect('autor.Libros', 'libro')
        .where('autor.id = :id', { id })
        .andWhere('autor.deletedAt IS NULL')
        .andWhere('libro.deletedAt IS NULL')
        .getOne();

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

  // : Promise<{ message: String }>
  async remove(id: number) {
    const autor = await this.autorRepository.findOne({ where: { id } });
    if (!autor) {
      throw new NotFoundException('Author not found');
    }

    await this.autorRepository.softRemove(autor);

    await this.libroRepository.update({ autor: { id } }, { deletedAt: new Date() });
  }
}
