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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artifact } from '../artifacts/artifact.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { UpdateMuseumDto } from './dto/update-museum.dto';
import { Museum } from './museum.entity';
import { MuseumsService } from './museums.service';

@ApiTags('Музеи')
@Controller('museums')
export class MuseumsController {
  constructor(private readonly museumsService: MuseumsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать музей' })
  @ApiResponse({ status: 201, description: 'Музей создан', type: Museum })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateMuseumDto): Promise<Museum> {
    return this.museumsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все музеи' })
  @ApiResponse({
    status: 200,
    description: 'Список музеев',
    type: Museum,
    isArray: true,
  })
  findAll(): Promise<Museum[]> {
    return this.museumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить музей по id' })
  @ApiParam({ name: 'id', description: 'Идентификатор музея', example: 1 })
  @ApiResponse({ status: 200, description: 'Музей найден', type: Museum })
  @ApiResponse({ status: 404, description: 'Музей не найден' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Museum> {
    return this.museumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить музей' })
  @ApiParam({ name: 'id', description: 'Идентификатор музея', example: 1 })
  @ApiResponse({ status: 200, description: 'Музей обновлён', type: Museum })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Музей не найден' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMuseumDto,
  ): Promise<Museum> {
    return this.museumsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить музей' })
  @ApiParam({ name: 'id', description: 'Идентификатор музея', example: 1 })
  @ApiResponse({ status: 200, description: 'Музей удалён' })
  @ApiResponse({ status: 404, description: 'Музей не найден' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.museumsService.remove(id);
  }

  @Get(':id/exhibits')
  @ApiOperation({ summary: 'Получить все выставки музея' })
  @ApiParam({ name: 'id', description: 'Идентификатор музея', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Список выставок музея',
    type: Exhibit,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Музей не найден' })
  findExhibits(@Param('id', ParseIntPipe) id: number): Promise<Exhibit[]> {
    return this.museumsService.findExhibits(id);
  }

  @Get(':id/artifacts')
  @ApiOperation({ summary: 'Получить все артефакты музея' })
  @ApiParam({ name: 'id', description: 'Идентификатор музея', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Список артефактов всех выставок музея',
    type: Artifact,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Музей не найден' })
  findArtifacts(@Param('id', ParseIntPipe) id: number): Promise<Artifact[]> {
    return this.museumsService.findArtifacts(id);
  }
}
