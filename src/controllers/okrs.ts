import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { OkrModel } from "../models/okr.model";
import { WorkingTimeDistributionItemModel } from "../models/workingtime-distribution-item.model";
import currentOkrsFakeData from "../../fakedata/fake-currentOkrs-data.json";
import express from "express";
import { injectable } from "inversify";

@ApiPath({
  path: "/okrs",
  name: "Okrs",
  security: { basicAuth: [] },
})
@controller("/okrs")
@injectable()
export class OkrsController implements interfaces.Controller {
  public static TARGET_NAME: string = "OkrsController";

  @ApiOperationGet({
    path: "",
    description: "Get his own current okrs",
    summary: "Get current okrs",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Okr",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/")
  public workingTimeDistribution(
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ): void {
    response.json(
      currentOkrsFakeData.map(
        (elt: any) =>
          new OkrModel(elt.id, elt.label, elt.icon, elt.completed, elt.total)
      )
    );
  }
}
