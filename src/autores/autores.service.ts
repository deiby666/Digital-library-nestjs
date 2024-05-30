import { Injectable } from '@nestjs/common';
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
  ){}

  create(createAutoreDto: CreateAutoreDto) {
    return  this.autorRepository.save(createAutoreDto);
  }

  async findAll() {
    return this.autorRepository.find({
      select: {}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} autore`;
  }

  update(id: number, updateAutoreDto: UpdateAutoreDto) {
    return `This action updates a #${id} autore`;
  }

  remove(id: number) {
    return `This action removes a #${id} autore`;
  }
}
