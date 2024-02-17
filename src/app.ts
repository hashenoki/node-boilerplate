import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from 'middleware/error-handler';
import routes from 'routes';

const app = express();

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
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });

  return app;
};
