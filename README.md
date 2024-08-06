# Node Boilerplate

## Requirements

- [Docker](https://www.docker.com/)
- [Node v18+](https://nodejs.org/) (optional, included in docker image)
- [pnpm](https://pnpm.io/) (optional, included in docker image)

## Development

```bash
cp .env.example .env
pnpm install

# start docker container with postgres and node
pnpm docker:dev
# or start only with node
pnpm dev

# you may need to run migrations too:
pnpm migrate
```

## Migrations

`pnpm db:push` - push database changes during development

`pnpm db:seed` - seed database with data

`pnpm migrate:generate` - create a migration from changes in schema

`pnpm migrate` - deploy pending migrations

`pnpm db:reset` - rollback entire database

`pnpm studio` - opens drizzle studio

## Docker

Build image

`docker build -t boilerplate .`

Run image:

`docker run -it -p 8000:8000 boilerplate`

