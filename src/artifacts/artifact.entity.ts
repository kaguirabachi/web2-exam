import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exhibit } from '../exhibits/exhibit.entity';

@Entity('artifacts')
export class Artifact {
  @ApiProperty({ example: 1, description: 'Идентификатор артефакта' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Саркофаг', description: 'Название артефакта' })
  @Column()
  name: string;

  @ApiProperty({ example: 3200, description: 'Возраст артефакта в годах' })
  @Column()
  age: number;

  @ApiProperty({ example: 1, description: 'Идентификатор выставки' })
  @Column()
  exhibitId: number;

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.artifacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exhibitId' })
  exhibit: Exhibit;
}
