import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { OkrStatisticsModelItem } from "./okrs-statistics-item.model";

@ApiModel({
  description: "OkrStatistics model for the okrs statistics",
  name: "OkrStatistics",
})
export class OkrStatisticsModel {
  @ApiModelProperty({
    description: "The labels for each group of data",
    required: true,
    example: [
      "Octobre",
      "Novembre",
      "Décembre",
      "Janvier",
      "Février",
      "Mars"],
  })
  labels: string[];

  @ApiModelProperty({
    description: "The data sets",
    required: true,
    example: [{ label: "Articles repostés", data: [2, 4, 2, 5, 5, 1] }],
  })
  statistics: OkrStatisticsModelItem[];

  constructor(labels: string[], statistics: any[]) {
    this.labels = labels;
    this.statistics = statistics.map(elt => new OkrStatisticsModelItem(elt.label, elt.data));
  }
}
