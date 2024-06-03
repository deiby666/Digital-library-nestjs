import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';

@Injectable()
export class VentasService {
  constructor(
  @InjectRepository(Venta)
  private readonly ventaRepository: Repository<Venta>,

  @InjectRepository(Libro)
  private readonly libroRepository: Repository<Libro>,
  ){}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const libro = await this.libroRepository.findOneBy({ id: createVentaDto.idLibro});
    if (!libro) {
      throw new NotFoundException('Libro not found');
    }

    const venta = this.ventaRepository.create({
      ...createVentaDto,
      libro
    });

    return this.ventaRepository.save(venta);
  }

  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Venta[]> {
    const skip = (page - 1) * limit;
    return this.ventaRepository.find({
      skip,
      take: limit,
    });
  }
  findOne(id: number) {
    return this.ventaRepository.findOne({
      where: { id },
      select: {
        id: true,
        precioTotal: true,
      },
    });
  }

  async update(id: number, UpdateVentaDto: UpdateVentaDto): Promise<Venta> {
    const result = await this.ventaRepository.update(id, UpdateVentaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`venta con ID ${id} no encontrado`);
    }

    const dataUpdated = this.ventaRepository.findOneBy({ id })
    return dataUpdated
  }

  async remove(id: number): Promise<{message: String}>{
    const result = await this.ventaRepository.delete(id);

    if (result.affected === 0) {
        throw new NotFoundException(`venta con ID ${id} no encontrado`);
    }
    
    return {
      message: "venta deleted successfully"
    }
  }
}
