import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "OkrStatisticsItem model for the okrs statistics",
  name: "OkrStatisticsItem",
})
export class OkrStatisticsModelItem {
  @ApiModelProperty({
    description: "The label for the data set",
    required: true,
    example: "Articles repostés",
  })
  label: string;

  @ApiModelProperty({
    description: "The data for the data set",
    required: true,
    example: [2, 4, 2, 5, 5, 1],
  })
  data: number[];

  constructor(label: string, data: number[]) {
    this.label = label;
    this.data = data;
  }
}
