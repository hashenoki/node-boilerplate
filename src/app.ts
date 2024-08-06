import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import robots from 'express-robots-txt';
import helmet from 'helmet';
import morgan from 'morgan';
import pino from 'pino-http';

import { HTTP_LOG_ENABLED, PORT } from 'config';
import { errorHandler } from 'middleware/error-handler';
import routes from 'routes';
import { logger } from 'utils/logger';

const limiter = rateLimit({
  windowMs: 60_000, // 1 minute
  limit: 30, // limit each IP to 30 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const app = express();
app.use(pino({ logger, autoLogging: HTTP_LOG_ENABLED === 'true' }));

app.use(
  robots({
    UserAgent: '*',
    Disallow: '/',
  }),
);
app.use(limiter);
app.use(cors());
app.use(helmet());
// app.use(bodyParser.json());
app.use(
  morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  }),
);
app.use(
  bodyParser.json({
    // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
    // verify: function (req, res, buf) {
    //   const url = req.url;
    //   if (url.startsWith('/stripe/webhook')) {
    //     (req as any).rawBody = buf.toString();
    //   }
    // },
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use(errorHandler);

export const startApp = () => {
  app.listen(PORT, () => {
    logger.info('Server is running on port ' + PORT);
  });

  return app;
};
