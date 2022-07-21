import type { APIPlayerSeason, Season } from "../SportRaderAPI.types.js";
import mapOffensiveStats from "./mapOffensiveStats.js";

export default (season: APIPlayerSeason): Season => ({
  statistics: {
    hitting: mapOffensiveStats(season.totals.statistics),
  },
  ...season,
});
