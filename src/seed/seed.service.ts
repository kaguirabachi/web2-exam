import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artifact } from '../artifacts/artifact.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Museum } from '../museums/museum.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Museum)
    private readonly museumsRepository: Repository<Museum>,
    @InjectRepository(Exhibit)
    private readonly exhibitsRepository: Repository<Exhibit>,
    @InjectRepository(Artifact)
    private readonly artifactsRepository: Repository<Artifact>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (this.configService.get<string>('DB_SEED', 'true') === 'false') {
      this.logger.log('Автозаполнение базы отключено (DB_SEED=false)');
      return;
    }

    const museumsCount = await this.museumsRepository.count();

    if (museumsCount > 0) {
      this.logger.log('В базе уже есть данные — автозаполнение пропущено');
      return;
    }

    const museum = await this.museumsRepository.save(
      this.museumsRepository.create({
        name: 'Лувр',
        location: 'Париж',
      }),
    );

    const [renaissance, antiquity, ancientEast] =
      await this.exhibitsRepository.save([
        this.exhibitsRepository.create({
          title: 'Шедевры Высокого Возрождения',
          museumId: museum.id,
        }),
        this.exhibitsRepository.create({
          title: 'Античная скульптура',
          museumId: museum.id,
        }),
        this.exhibitsRepository.create({
          title: 'Древний Восток: кодексы и реликвии',
          museumId: museum.id,
        }),
      ]);

    await this.artifactsRepository.save([
      this.artifactsRepository.create({
        name: 'Мона Лиза',
        age: 520,
        exhibitId: renaissance.id,
      }),
      this.artifactsRepository.create({
        name: 'Венера Милосская',
        age: 2100,
        exhibitId: antiquity.id,
      }),
      this.artifactsRepository.create({
        name: 'Стела Хаммурапи',
        age: 3780,
        exhibitId: ancientEast.id,
      }),
    ]);

    this.logger.log('База заполнена демонстрационными данными Лувра');
  }
}
