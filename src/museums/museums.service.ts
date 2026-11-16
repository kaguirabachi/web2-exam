import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artifact } from '../artifacts/artifact.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';
import { Museum } from './museum.entity';

@Injectable()
export class MuseumsService {
  constructor(
    @InjectRepository(Museum)
    private readonly museumsRepository: Repository<Museum>,
    @InjectRepository(Exhibit)
    private readonly exhibitsRepository: Repository<Exhibit>,
  ) {}

  create(dto: CreateMuseumDto): Promise<Museum> {
    const museum = this.museumsRepository.create(dto);
    return this.museumsRepository.save(museum);
  }

  findAll(): Promise<Museum[]> {
    return this.museumsRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Museum> {
    const museum = await this.museumsRepository.findOneBy({ id });

    if (!museum) {
      throw new NotFoundException(`Музей с id=${id} не найден`);
    }

    return museum;
  }

  async update(id: number, dto: UpdateMuseumDto): Promise<Museum> {
    const museum = await this.findOne(id);
    Object.assign(museum, dto);
    return this.museumsRepository.save(museum);
  }

  async remove(id: number): Promise<{ message: string }> {
    const museum = await this.findOne(id);
    await this.museumsRepository.remove(museum);
    return { message: `Музей с id=${id} удалён` };
  }

  async findExhibits(id: number): Promise<Exhibit[]> {
    await this.findOne(id);

    return this.exhibitsRepository.find({
      where: { museumId: id },
      order: { id: 'ASC' },
    });
  }

  async findArtifacts(id: number): Promise<Artifact[]> {
    await this.findOne(id);

    const exhibits = await this.exhibitsRepository.find({
      where: { museumId: id },
      relations: ['artifacts'],
    });

    return exhibits
      .flatMap((exhibit) => exhibit.artifacts)
      .sort((first, second) => first.id - second.id);
  }
}
