import * as express from "express";

export default class Server {
  app: express.Express;
  /**
   * This is constructor
   * @param config
   */
  constructor(private config) {
    this.app = express();
  }
  /**
   * To setup route
   */
  setupRoute() {
    this.app.get("/health-check", (req, res) => {
      res.status(200).send("I am OK");
    });
  }

  /**
   * To bootstrap app
   * @returns
   */
  bootstrap() {
    this.setupRoute();
    return this;
  }

  run() {
    const { port, env } = this.config;
    this.app.listen(port, () => {
      console.log(
        `Server started successfully on ${port} in ${env} environment`
      );
    });
    return this;
  }
}

