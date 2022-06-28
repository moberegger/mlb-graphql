import { RESTDataSource } from "apollo-datasource-rest";

export default class MLBStatsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://statsapi.mlb.com";
  }

  async getPlayer(id: string) {
    const { people } = await this.get(`/api/v1/people/${id}`);
    const player = people?.[0];

    if (!player) return null;

    return {
      id: player.id,
      name: player.fullName,
    };
  }
}
