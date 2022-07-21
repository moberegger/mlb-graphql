import type { APITeamStats, Season } from "../SportRaderAPI.types.js";
import mapOffensiveStats from "./mapOffensiveStats.js";

export default (teamStats: APITeamStats): Season => ({
  offensiveStats: mapOffensiveStats(teamStats.statistics),
  ...teamStats.season,
});
