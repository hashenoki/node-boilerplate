import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schema/*',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
