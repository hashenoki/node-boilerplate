import 'dotenv/config';

import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';

import { logger } from 'utils/logger';

import { migrationClient } from './client';

(async () => {
  const db = drizzle(migrationClient);
  const tablenames = await db.execute(sql`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '__drizzle_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  const datatypes = await db.execute(sql`SELECT typname FROM pg_type WHERE typnamespace = 2200`);
  const types = datatypes
    .map(({ typname }) => typname)
    .map((name) => `"public"."${name}"`)
    .join(', ');
  logger.info({
    tablenames,
    tables,
    types,
  });
  try {
    if (tablenames.length) {
      await db.execute(sql`TRUNCATE TABLE ${sql.raw(tables)} CASCADE;`);
      for (const table of tablenames) {
        await db.execute(sql`DROP TABLE IF EXISTS ${sql.raw(`"public"."${table.tablename}"`)} CASCADE;`);
      }
    }

    if (types.length) {
      for (const type of datatypes) {
        await db.execute(sql`DROP TYPE IF EXISTS ${sql.raw(`"public"."${type.typname}"`)} CASCADE;`);
      }
    }

    await db.execute(sql`TRUNCATE TABLE "drizzle"."__drizzle_migrations";`);
  } catch (error) {
    logger.info(error);
  }
  await migrationClient.end();
})();
