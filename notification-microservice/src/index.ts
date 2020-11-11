import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes';

createConnection()
  .then(async (connection) => {
    dotenv.config();

    // create express app
    const app = express();
    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    // tslint:disable-next-line: no-console
    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`
    );
  })
  // tslint:disable-next-line: no-console
  .catch((error) => console.log(error));
