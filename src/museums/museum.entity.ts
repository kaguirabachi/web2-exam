import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exhibit } from '../exhibits/exhibit.entity';

@Entity('museums')
export class Museum {
  @ApiProperty({ example: 1, description: 'Идентификатор музея' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Эрмитаж', description: 'Название музея' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Санкт-Петербург', description: 'Город музея' })
  @Column()
  location: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.museum)
  exhibits: Exhibit[];
}
