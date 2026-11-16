import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './artifacts/artifact.entity';
import { ArtifactsModule } from './artifacts/artifacts.module';
import { Exhibit } from './exhibits/exhibit.entity';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { Museum } from './museums/museum.entity';
import { MuseumsModule } from './museums/museums.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'museum_db'),
        entities: [Museum, Exhibit, Artifact],
        synchronize: configService.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    MuseumsModule,
    ExhibitsModule,
    ArtifactsModule,
    SeedModule,
  ],
})
export class AppModule {}
