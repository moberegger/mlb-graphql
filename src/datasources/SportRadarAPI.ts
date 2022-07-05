import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

import type { Position } from "./utils/mapPosition.js";
import type { PrimaryPosition } from "./utils/mapPrimaryPosition.js";

import mapPlayer from "./utils/mapPlayer.js";

const API_KEY: string = process.env["SPORT_RADAR_API_KEY"] || "";

export interface Player {
  id: string;
  name: string;
  position: string;
  primaryPosition: string;
}
export interface APIPlayer {
  id: string;
  full_name: string;
  position: Position;
  primary_position: PrimaryPosition;
}

export default class SportRadarAPI extends RESTDataSource {
  private apiKey: string;

  constructor() {
    super();
    this.baseURL = "https://api.sportradar.us/mlb/trial/v7/en";
    this.apiKey = API_KEY;
  }

  override willSendRequest(request: RequestOptions) {
    request.params.append("api_key", this.apiKey);
  }

  async getPlayer(id: string) {
    const { player }: { player: APIPlayer } = await this.get(
      `players/${id}/profile.json`
    );

    // if (!player) return null;

    return mapPlayer(player);
  }
}
