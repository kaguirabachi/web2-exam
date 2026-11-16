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
import { Artifact } from './artifact.entity';
import { ArtifactsService } from './artifacts.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@ApiTags('Артефакты')
@Controller('artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать артефакт' })
  @ApiResponse({ status: 201, description: 'Артефакт создан', type: Artifact })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() dto: CreateArtifactDto): Promise<Artifact> {
    return this.artifactsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все артефакты' })
  @ApiResponse({
    status: 200,
    description: 'Список артефактов',
    type: Artifact,
    isArray: true,
  })
  findAll(): Promise<Artifact[]> {
    return this.artifactsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить артефакт по id' })
  @ApiParam({ name: 'id', description: 'Идентификатор артефакта', example: 1 })
  @ApiResponse({ status: 200, description: 'Артефакт найден', type: Artifact })
  @ApiResponse({ status: 404, description: 'Артефакт не найден' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Artifact> {
    return this.artifactsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить артефакт' })
  @ApiParam({ name: 'id', description: 'Идентификатор артефакта', example: 1 })
  @ApiResponse({ status: 200, description: 'Артефакт обновлён', type: Artifact })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Артефакт не найден' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArtifactDto,
  ): Promise<Artifact> {
    return this.artifactsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить артефакт' })
  @ApiParam({ name: 'id', description: 'Идентификатор артефакта', example: 1 })
  @ApiResponse({ status: 200, description: 'Артефакт удалён' })
  @ApiResponse({ status: 404, description: 'Артефакт не найден' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.artifactsService.remove(id);
  }
}
