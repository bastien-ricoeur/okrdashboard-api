import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { AboutModel } from "../models/about.model";
import express from "express";
import { injectable } from "inversify";

@ApiPath({
  path: "/about",
  name: "About",
  security: { basicAuth: [] },
})
@controller("/about")
@injectable()
export class AboutController implements interfaces.Controller {
  public static TARGET_NAME: string = "AboutController";

  @ApiOperationGet({
    description: "Get versions and environment of the application",
    summary: "About of the application",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "About",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/")
  public about(
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ): void {
    response.json(new AboutModel(process.env.APP_VERSION, process.env.APP_ENVIRONMENT));
  }
}
