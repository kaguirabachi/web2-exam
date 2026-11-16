import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artifact } from './artifact.entity';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@Injectable()
export class ArtifactsService {
  constructor(
    @InjectRepository(Artifact)
    private readonly artifactsRepository: Repository<Artifact>,
  ) {}

  create(dto: CreateArtifactDto): Promise<Artifact> {
    const artifact = this.artifactsRepository.create(dto);
    return this.artifactsRepository.save(artifact);
  }

  findAll(): Promise<Artifact[]> {
    return this.artifactsRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Artifact> {
    const artifact = await this.artifactsRepository.findOneBy({ id });

    if (!artifact) {
      throw new NotFoundException(`Артефакт с id=${id} не найден`);
    }

    return artifact;
  }

  async update(id: number, dto: UpdateArtifactDto): Promise<Artifact> {
    const artifact = await this.findOne(id);
    Object.assign(artifact, dto);
    return this.artifactsRepository.save(artifact);
  }

  async remove(id: number): Promise<{ message: string }> {
    const artifact = await this.findOne(id);
    await this.artifactsRepository.remove(artifact);
    return { message: `Артефакт с id=${id} удалён` };
  }
}
