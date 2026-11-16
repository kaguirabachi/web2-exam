import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateArtifactDto {
  @ApiProperty({
    example: 'Саркофаг',
    description: 'Название артефакта',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 3200,
    description: 'Возраст артефакта в годах',
  })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор выставки, к которой относится артефакт',
  })
  @IsInt()
  @Min(1)
  exhibitId: number;
}
