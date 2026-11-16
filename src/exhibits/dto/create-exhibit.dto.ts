import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateExhibitDto {
  @ApiProperty({
    example: 'Искусство Древнего Египта',
    description: 'Название выставки',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор музея, к которому относится выставка',
  })
  @IsInt()
  @Min(1)
  museumId: number;
}
