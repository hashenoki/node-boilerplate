# Node Boilerplate

## Requirements

- [Docker](https://www.docker.com/)
- [Node v18+](https://nodejs.org/) (optional, included in docker image)
- [Yarn](https://yarnpkg.com/) (optional, included in docker image)

## Development

```bash
cp .env.example .env
yarn install
yarn docker:dev
```

## Migrations

`yarn studio` - serves web interface for drizzle studio on https://local.drizzle.studio
`yarn migrate:generate` - creates migration file from changes found in schema files.
`yarn migrate` - runs migrations
`yarn db:push` - pushes schema changes to the database
`yarn db:seed` - seeds the database with initial data (/src/database/seed.ts file)
`yarn db:reset` - deletes all data and tables from the database

## Docker

Build image

`docker build -t node-api .`

