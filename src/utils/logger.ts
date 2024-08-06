import pino from 'pino';

import { LOG_LEVEL, NODE_ENV } from 'config';

// todo: change transport to whatever you prefer
// while coding, i prefer to use pino-pretty for better readability
// for production, i use pino-cloud-run to make logs readable on Google Cloud Run
const transport = pino.transport({
  targets:
    NODE_ENV === 'development'
      ? [
          {
            target: 'pino-pretty',
            level: LOG_LEVEL,
            options: {
              colorize: true,
            },
          },
        ]
      : [
          {
            target: 'pino-cloud-run',
            level: LOG_LEVEL,
          },
        ],
});

export const logger = pino({ level: LOG_LEVEL, timestamp: pino.stdTimeFunctions.isoTime }, transport);
