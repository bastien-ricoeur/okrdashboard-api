import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { WorkingTimeDistributionItemModel } from "../models/workingtime-distribution-item.model";
import express from "express";
import { injectable } from "inversify";
import workingTimeDistributionFakeData from "../../fakedata/fake-wtDistribution-data.json";
import okrsStatisticsFakeData from '../../fakedata/fake-okrStats-data.json';
import { OkrStatisticsModel } from "../models/okrs-statistics.model";

@ApiPath({
  path: "/stats",
  name: "Stats",
  security: { basicAuth: [] },
})
@controller("/stats")
@injectable()
export class StatsController implements interfaces.Controller {
  public static TARGET_NAME: string = "StatsController";

  @ApiOperationGet({
    path: "/workingtime-distribution",
    description: "Get his own working time distrbution",
    summary: "Get working time distribution",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "WorkingTimeDistributionItem",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/workingtime-distribution")
  public workingTimeDistribution(
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ): void {
    response.json(
      workingTimeDistributionFakeData.map(
        (elt: any) => new WorkingTimeDistributionItemModel(elt.label, elt.data)
      )
    );
  }

  @ApiOperationGet({
    path: "/okrs",
    description: "Get his own okrs statistics for the last 6 months",
    summary: "Get okrs statistics",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "OkrStatistics",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/okrs")
  public okrs(
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ): void {
    response.json(
      new OkrStatisticsModel(okrsStatisticsFakeData.labels, okrsStatisticsFakeData.statistics)
    );
  }
}
