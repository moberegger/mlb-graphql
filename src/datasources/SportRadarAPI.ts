import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

const API_KEY: string = process.env["SPORT_RADAR_API_KEY"] || "";

export default class SportRadarAPI extends RESTDataSource {
  apiKey: string;

  constructor() {
    super();
    this.baseURL = "https://api.sportradar.us/mlb/trial/v7/en";
    this.apiKey = API_KEY;
  }

  override willSendRequest(request: RequestOptions) {
    request.params.append("api_key", this.apiKey);
  }

  async getPlayer(id: string) {
    const { player } = await this.get(`players/${id}/profile.json`);

    if (!player) return null;

    return {
      id: player.id,
      name: player.full_name,
    };
  }
}
