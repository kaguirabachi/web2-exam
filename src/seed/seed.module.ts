import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from '../artifacts/artifact.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Museum } from '../museums/museum.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Museum, Exhibit, Artifact])],
  providers: [SeedService],
})
export class SeedModule {}
