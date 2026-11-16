import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';
import { Museum } from './museum.entity';
import { MuseumsService } from './museums.service';

@Controller('museums')
export class MuseumsController {
  constructor(private readonly museumsService: MuseumsService) {}

  @Post()
  create(@Body() dto: CreateMuseumDto): Promise<Museum> {
    return this.museumsService.create(dto);
  }

  @Get()
  findAll(): Promise<Museum[]> {
    return this.museumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Museum> {
    return this.museumsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMuseumDto,
  ): Promise<Museum> {
    return this.museumsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.museumsService.remove(id);
  }
}
