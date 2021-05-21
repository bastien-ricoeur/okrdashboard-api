import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Okr model",
  name: "Okr",
})
export class OkrModel {
  @ApiModelProperty({
    description: "Id of the okr",
    required: true,
    example: 1,
  })
  id: number;

  @ApiModelProperty({
    description: "Label of the okr",
    required: true,
    example: "Articles repostés",
  })
  label: string;

  @ApiModelProperty({
    description: "Icon for the okr card",
    required: true,
    example: "linkedin",
  })
  icon: string;

  @ApiModelProperty({
    description: "Completed item number for the okr",
    required: true,
    example: 4,
  })
  completed: number;

  @ApiModelProperty({
    description: "Total number for the okr",
    required: true,
    example: 5,
  })
  total: number;

  constructor(id: number, label: string, icon: string, completed: number, total: number) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.completed = completed;
    this.total = total;
  }
}
