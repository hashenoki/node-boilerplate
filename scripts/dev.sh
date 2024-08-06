#!/usr/bin/env bash
set -e

cleanup() {
    docker compose -f docker-compose.dev.yml stop
    trap '' EXIT INT TERM
    exit $err
}

trap cleanup SIGINT EXIT

# Make sure docker is installed
if ! hash docker 2>/dev/null; then
  echo -e '\033[0;31mPlease install docker\033[0m'
  exit 1
fi

if [ -z "$(docker network ls -qf name=^entropic$)" ]; then
  echo "Creating network"
  docker network create entropic >/dev/null
fi

COMPOSE_HTTP_TIMEOUT=120 docker compose -f docker-compose.dev.yml up -d

# pnpm migrate # Run migrations if using database

pnpm dev
