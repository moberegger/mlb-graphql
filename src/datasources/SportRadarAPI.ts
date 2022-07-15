import type { RequestOptions } from "apollo-datasource-rest";

import mapPlayer from "./utils/mapPlayer.js";
import ExtendedRESTDataSource from "./base/ExtendedRESTDataSource.js";
import url from "./base/url.js";
import mapTeam from "./utils/mapTeam.js";
import type { APIPlayer, APITeam } from "./SportRaderAPI.types.js";

const API_KEY: string = process.env["SPORT_RADAR_API_KEY"] || "";

export * from "./SportRaderAPI.types.js";

export default class SportRadarAPI extends ExtendedRESTDataSource {
  private apiKey: string;

  constructor() {
    super();
    this.baseURL = "https://api.sportradar.us/mlb/trial/v7/en";
    this.apiKey = API_KEY;
  }

  // eslint-disable-next-line class-methods-use-this
  override cacheOptionsFor = () => ({ ttl: 60 });

  override willSendRequest(request: RequestOptions) {
    request.params.append("api_key", this.apiKey);
  }

  async getPlayer(id: string) {
    const response = await this.get<{
      player: APIPlayer;
    }>(url`players/${id}/profile.json`);

    if (!response) return null;

    return mapPlayer(response.player);
  }

  async getTeam(id: string) {
    const team = await this.get<APITeam>(url`teams/${id}/profile.json`);

    if (!team) return null;

    return mapTeam(team) || null;
  }
}
