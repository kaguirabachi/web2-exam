import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Museum } from './museum.entity';
import { MuseumsController } from './museums.controller';
import { MuseumsService } from './museums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Museum, Exhibit])],
  controllers: [MuseumsController],
  providers: [MuseumsService],
})
export class MuseumsModule {}
