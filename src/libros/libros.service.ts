import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {

  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,

  ) { }

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    return this.libroRepository.save(createLibroDto);
  }

  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Libro[]> {
    const skip = (page - 1) * limit;
    return this.libroRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.libroRepository.findOne({
      where: { id },
      select: {
        id: true,
        nombre: true,
      },
    });
  }

  async findVentasByBook(id: number): Promise<Libro> {
    const autor = await this.libroRepository.findOne({
      where: { id },
      relations: ['ventas'],
    });

    console.log(autor);
    

    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return autor;
  }


  async update(id: number, UpdateLibroDto: UpdateLibroDto): Promise<Libro> {
    const result = await this.libroRepository.update(id, UpdateLibroDto);
    if (result.affected === 0) {
      throw new NotFoundException(`libro con ID ${id} no encontrado`);
    }

    const dataUpdated = this.libroRepository.findOneBy({ id })
    return dataUpdated
  }


  async remove(id: number): Promise<{ message: String }> {
    const result = await this.libroRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`libro con ID ${id} no encontrado`);
    }

    return {
      message: "libro deleted successfully"
    }
  }
}
