import * as express from "express";
import * as bodyParser from "body-parser";
import notFoundRoute from "./libs/routes/notFoundRoute";
import errorHandler from "./libs/routes/errorHandler";

export default class Server {
  private app: express.Express;

  constructor(private config: any) {
    this.app = express();
  }

  get application() {
    return this.app;
  }

  public initBodyParser() {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  /**
   * To setup route
   * @return - Instance of current object
   * @memberof Server
   */

  public setupRoute() {
    const { app } = this;

    app.use("/health-check", (req, res) => {
      res.status(200).send("I am OK");
    });

    app.use(notFoundRoute);
    app.use(errorHandler);
  }

  /**
   * To bootstrap app
   * @returns
   */
  bootstrap() {
    this.setupRoute();
    this.initBodyParser();

    return this.app;
  }

  public run() {
    const { port, env } = this.config;
    this.app.listen(port, () => {
      console.log(
        `Server started successfully on ${port} in ${env} environment`
      );
    });
    return this;
  }
}
