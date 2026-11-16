import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { ExhibitsController } from './exhibits.controller';
import { ExhibitsService } from './exhibits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit])],
  controllers: [ExhibitsController],
  providers: [ExhibitsService],
})
export class ExhibitsModule {}
