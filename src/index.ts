import "reflect-metadata";

import * as express from "express";
import * as swagger from "swagger-express-ts";

import {
  InversifyExpressServer,
  TYPE,
  interfaces,
} from "inversify-express-utils";

import { AboutController } from "./controllers/about";
import { Container } from "inversify";
import { StatsController } from "./controllers/stats";

import * as dotenv from "dotenv";
dotenv.config();

// set up container
const container = new Container();

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(AboutController)
  .inSingletonScope()
  .whenTargetNamed(AboutController.TARGET_NAME);

container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(StatsController)
  .inSingletonScope()
  .whenTargetNamed(StatsController.TARGET_NAME);


// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(
    swagger.express({
      definition: {
        info: {
          title: "OkrDashboard APi",
          version: "1.0",
        },
      },
    })
  );
});

server.setErrorConfig((app: any) => {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      response.status(500).send("Internal server error");
    }
  );
});

const app = server.build();

app.get("/", (_req, res) => {
  res.redirect("/api-docs/swagger");
});

app.listen(process.env.PORT, () =>
  console.log(`server started at http://localhost:${process.env.PORT}`)
);
