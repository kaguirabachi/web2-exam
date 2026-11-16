import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artifact } from '../artifacts/artifact.entity';
import { Museum } from '../museums/museum.entity';

@Entity('exhibits')
export class Exhibit {
  @ApiProperty({ example: 1, description: 'Идентификатор выставки' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Искусство Древнего Египта', description: 'Название выставки' })
  @Column()
  title: string;

  @ApiProperty({ example: 1, description: 'Идентификатор музея' })
  @Column()
  museumId: number;

  @ManyToOne(() => Museum, (museum) => museum.exhibits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'museumId' })
  museum: Museum;

  @OneToMany(() => Artifact, (artifact) => artifact.exhibit)
  artifacts: Artifact[];
}
