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
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { Exhibit } from './exhibit.entity';
import { ExhibitsService } from './exhibits.service';

@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  create(@Body() dto: CreateExhibitDto): Promise<Exhibit> {
    return this.exhibitsService.create(dto);
  }

  @Get()
  findAll(): Promise<Exhibit[]> {
    return this.exhibitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Exhibit> {
    return this.exhibitsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExhibitDto,
  ): Promise<Exhibit> {
    return this.exhibitsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.exhibitsService.remove(id);
  }
}
