import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "About model",
  name: "About",
})
export class AboutModel {
  @ApiModelProperty({
    description: "Version of the application",
    required: true,
    example: "1.0.2",
  })
  version: string;

  @ApiModelProperty({
    description: "Environment of the application",
    required: true,
    example: "DEV",
  })
  environment: string;

  constructor(version: string, environment: string) {
    this.version = version;
    this.environment = environment;
  }
}
