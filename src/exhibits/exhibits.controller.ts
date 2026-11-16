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
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { Exhibit } from './exhibit.entity';
import { ExhibitsService } from './exhibits.service';

@ApiTags('Выставки')
@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать выставку' })
  @ApiResponse({ status: 201, description: 'Выставка создана', type: Exhibit })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateExhibitDto): Promise<Exhibit> {
    return this.exhibitsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все выставки' })
  @ApiResponse({
    status: 200,
    description: 'Список выставок',
    type: Exhibit,
    isArray: true,
  })
  findAll(): Promise<Exhibit[]> {
    return this.exhibitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить выставку по id' })
  @ApiParam({ name: 'id', description: 'Идентификатор выставки', example: 1 })
  @ApiResponse({ status: 200, description: 'Выставка найдена', type: Exhibit })
  @ApiResponse({ status: 404, description: 'Выставка не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Exhibit> {
    return this.exhibitsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить выставку' })
  @ApiParam({ name: 'id', description: 'Идентификатор выставки', example: 1 })
  @ApiResponse({ status: 200, description: 'Выставка обновлена', type: Exhibit })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Выставка не найдена' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExhibitDto,
  ): Promise<Exhibit> {
    return this.exhibitsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить выставку' })
  @ApiParam({ name: 'id', description: 'Идентификатор выставки', example: 1 })
  @ApiResponse({ status: 200, description: 'Выставка удалена' })
  @ApiResponse({ status: 404, description: 'Выставка не найдена' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.exhibitsService.remove(id);
  }

  @Get(':id/artifacts')
  @ApiOperation({ summary: 'Получить все артефакты выставки' })
  @ApiParam({ name: 'id', description: 'Идентификатор выставки', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Список артефактов выставки',
    type: Artifact,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Выставка не найдена' })
  findArtifacts(@Param('id', ParseIntPipe) id: number): Promise<Artifact[]> {
    return this.exhibitsService.findArtifacts(id);
  }
}
