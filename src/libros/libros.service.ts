import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autore } from 'src/autores/entities/autore.entity';

@Injectable()
export class LibrosService {

  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,

    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>,

  ) { }

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {

    const autor = await this.autorRepository.findOneBy({ id: createLibroDto.authorId, deletedAt: null });
    if (!autor) {
      throw new NotFoundException('Author not found');
    }

    const book = this.libroRepository.create({
      ...createLibroDto,
      autor
    });

    return this.libroRepository.save(book);
  }

  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Libro[]> {
    const skip = (page - 1) * limit;
    return this.libroRepository.find({
      skip,
      take: limit,
      where: { deletedAt: null },
      relations: ['autor'],
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


  async remove(id: number) {
    const libro = await this.libroRepository.findOne({ where: { id } });
    if (!libro) {
      throw new NotFoundException('Libro not found');
    }

    console.log(libro);
    
    // Mark the libro as deleted
    await this.libroRepository.softRemove(libro);

    // Ensure the deletedAt date is set correctly
    await this.libroRepository.update(id, { deletedAt: new Date() });

    // Update the related author if needed
    const autor = await this.autorRepository.findOne({
      where: { id: libro.id, deletedAt: null },
      relations: ['Libros']
    });

    console.log(autor);
    
    if (autor) {
      autor.Libros = autor.Libros.map(lib => lib.id === id ? { ...lib, deletedAt: new Date() } : lib);
      await this.autorRepository.save(autor);
    }
  }
}
