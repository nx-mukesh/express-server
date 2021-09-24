import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import Database from './libs/Database';
import { notFoundRoute, errorHandler } from './libs/routes';
import router from './router';
import Swagger from './libs/Swagger';

export default class Server {
  private app: express.Express;

  constructor(private config: any) {
    this.app = express();
  }

  get application() {
    return this.app;
  }

  public initBodyParser() {
    // middleware
    const { app } = this;
    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }

  /**
   * To setup route
   * @return - Instance of current object
   * @memberof Server
   */

  public setupRoute() {
    const { app } = this;
    // const jsonParser = bodyParser.json();

    app.use('/health-check', (req, res) => {
      res.status(200).send('I am OK');
    });
    app.use('/api', router);
    app.use(notFoundRoute);
    app.use(errorHandler);
  }
  /**
   * To bootstrap app
   * @returns
   */
  bootstrap() {
    this.initBodyParser();
    this.initSwagger();
    this.setupRoute();

    return this.app;
  }

  public async run() {
    const { port, env, mongoURL } = this.config;
    try {
      await Database.open(mongoURL);
      this.app.listen(port, () => {
        console.log(`|| Server is running at PORT '${port}' in '${env}' mode ||`);
      });
    } catch (err) {
      console.log('Database connection error', err);
    }
    return this;
  }

  /**
   * @description : Init Swagger
   */
  private initSwagger() {
    const { swaggerDefinition, swaggerUrl } = this.config;
    const swaggerSetup = new Swagger();

    // JSON route
    this.app.use(
      `${swaggerUrl}.json`,
      swaggerSetup.getRouter({
        swaggerDefinition,
      })
    );

    // UI route
    const { serve, setup } = swaggerSetup.getUI(swaggerUrl);
    this.app.use(swaggerUrl, serve, setup);
  }
}
