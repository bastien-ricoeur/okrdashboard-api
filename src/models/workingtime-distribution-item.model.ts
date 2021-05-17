import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Working time distribution item for statistics",
  name: "WorkingTimeDistributionItem",
})
export class WorkingTimeDistributionItemModel {
  @ApiModelProperty({
    description: "The label of item",
    required: true,
    example: "Production",
  })
  label: string;

  @ApiModelProperty({
    description: "The hour number for this item",
    required: true,
    example: 80,
  })
  data: number;

  constructor(label: string, data: number) {
    this.label = label;
    this.data = data;
  }
}
