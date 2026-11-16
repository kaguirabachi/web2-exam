import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museum } from './museum.entity';
import { MuseumsController } from './museums.controller';
import { MuseumsService } from './museums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Museum])],
  controllers: [MuseumsController],
  providers: [MuseumsService],
})
export class MuseumsModule {}
