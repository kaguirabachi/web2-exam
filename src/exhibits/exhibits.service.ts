import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { Exhibit } from './exhibit.entity';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitsRepository: Repository<Exhibit>,
  ) {}

  create(dto: CreateExhibitDto): Promise<Exhibit> {
    const exhibit = this.exhibitsRepository.create(dto);
    return this.exhibitsRepository.save(exhibit);
  }

  findAll(): Promise<Exhibit[]> {
    return this.exhibitsRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Exhibit> {
    const exhibit = await this.exhibitsRepository.findOneBy({ id });

    if (!exhibit) {
      throw new NotFoundException(`Выставка с id=${id} не найдена`);
    }

    return exhibit;
  }

  async update(id: number, dto: UpdateExhibitDto): Promise<Exhibit> {
    const exhibit = await this.findOne(id);
    Object.assign(exhibit, dto);
    return this.exhibitsRepository.save(exhibit);
  }

  async remove(id: number): Promise<{ message: string }> {
    const exhibit = await this.findOne(id);
    await this.exhibitsRepository.remove(exhibit);
    return { message: `Выставка с id=${id} удалена` };
  }
}
