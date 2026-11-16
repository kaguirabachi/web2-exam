# Museum API

Учебный REST API для управления музеями, выставками и артефактами.
Иерархия «один ко многим»: **Museum → Exhibit → Artifact**.

## Стек

- NestJS 11 + TypeScript
- TypeORM + PostgreSQL 15
- Docker / Docker Compose
- Swagger (`@nestjs/swagger`)
- Валидация DTO: `class-validator` + `class-transformer`

## Структура проекта

```
src/
├── museums/
│   ├── dto/
│   ├── museum.entity.ts
│   ├── museums.controller.ts
│   ├── museums.module.ts
│   └── museums.service.ts
├── exhibits/
│   ├── dto/
│   ├── exhibit.entity.ts
│   ├── exhibits.controller.ts
│   ├── exhibits.module.ts
│   └── exhibits.service.ts
├── artifacts/
│   ├── dto/
│   ├── artifact.entity.ts
│   ├── artifacts.controller.ts
│   ├── artifacts.module.ts
│   └── artifacts.service.ts
├── app.module.ts
└── main.ts
```

## Запуск через Docker

```bash
docker compose up --build
```

После запуска:

- API: <http://localhost:3000>
- Swagger UI: <http://localhost:3000/api/docs>

Сервис `app` стартует только после успешной проверки здоровья PostgreSQL
(`healthcheck` + `depends_on: condition: service_healthy`). Дополнительно TypeORM
делает до 10 попыток подключения с интервалом 3 секунды, поэтому приложение не
падает, если база ещё не готова.

Остановить контейнеры:

```bash
docker compose down
```

Удалить контейнеры вместе с данными БД:

```bash
docker compose down -v
```

## Локальный запуск

1. Установить зависимости:

   ```bash
   npm install
   ```

2. Поднять только PostgreSQL:

   ```bash
   docker compose up -d db
   ```

3. Запустить приложение в режиме разработки:

   ```bash
   npm run start:dev
   ```

Параметры подключения находятся в `.env`. В учебном проекте файл закоммичен
намеренно и содержит только локальные демонстрационные значения.

## API

Базовый URL: `http://localhost:3000`.

### Музеи

| Метод  | Маршрут                     | Описание                        |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/museums`                  | Создать музей                   |
| GET    | `/museums`                  | Все музеи                       |
| GET    | `/museums/:id`              | Музей по id                     |
| PUT    | `/museums/:id`              | Обновить музей                  |
| DELETE | `/museums/:id`              | Удалить музей                   |
| GET    | `/museums/:id/exhibits`     | Все выставки музея               |
| GET    | `/museums/:id/artifacts`    | Все артефакты музея             |

### Выставки

| Метод  | Маршрут                | Описание                    |
| ------ | ---------------------- | --------------------------- |
| POST   | `/exhibits`            | Создать выставку            |
| GET    | `/exhibits`            | Все выставки                |
| GET    | `/exhibits/:id`        | Выставка по id              |
| PUT    | `/exhibits/:id`        | Обновить выставку           |
| DELETE | `/exhibits/:id`        | Удалить выставку            |
| GET    | `/exhibits/:id/artifacts` | Все артефакты выставки   |

### Артефакты

| Метод  | Маршрут           | Описание          |
| ------ | ----------------- | ----------------- |
| POST   | `/artifacts`      | Создать артефакт  |
| GET    | `/artifacts`      | Все артефакты     |
| GET    | `/artifacts/:id`  | Артефакт по id    |
| PUT    | `/artifacts/:id`  | Обновить артефакт |
| DELETE | `/artifacts/:id`  | Удалить артефакт  |

Если запись не найдена, возвращается `404 Not Found` (`NotFoundException`).
Вложенные GET-маршруты сначала проверяют существование родителя.

## Примеры запросов

Создать музей:

```bash
curl -X POST http://localhost:3000/museums \
  -H "Content-Type: application/json" \
  -d '{"name":"Эрмитаж","location":"Санкт-Петербург"}'
```

Создать выставку в музее с `id=1`:

```bash
curl -X POST http://localhost:3000/exhibits \
  -H "Content-Type: application/json" \
  -d '{"title":"Искусство Древнего Египта","museumId":1}'
```

Создать артефакт на выставке с `id=1`:

```bash
curl -X POST http://localhost:3000/artifacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Саркофаг","age":3200,"exhibitId":1}'
```

Получить все артефакты музея:

```bash
curl http://localhost:3000/museums/1/artifacts
```

## Особенности реализации

- Глобальный `ValidationPipe` с `whitelist`, `forbidNonWhitelisted` и `transform`.
- `UpdateDto` построены на `PartialType`, поэтому все поля необязательны.
- Связи настроены с `onDelete: 'CASCADE'`: удаление музея удаляет его выставки,
  а удаление выставки — её артефакты.
- `synchronize: true` включён для простоты учебного проекта. В production лучше
  использовать миграции TypeORM.
