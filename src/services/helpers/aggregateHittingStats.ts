import type {
  OffensiveStats,
  Season,
} from "../../datasources/SportRadarAPI.js";
import calculateAvg from "./calculateAvg.js";

export default (seasons: Season[]): OffensiveStats => {
  const stats = seasons.reduce<OffensiveStats>(
    (total, { offensiveStats }) => ({
      ...total,
      ab: total.ab + offensiveStats.ab,
      h: total.h + offensiveStats.h,
      rbi: total.rbi + offensiveStats.rbi,
    }),
    { ab: 0, rbi: 0, h: 0, avg: "" }
  );

  return {
    ...stats,
    avg: calculateAvg({ h: stats.h, ab: stats.ab }),
  };
};
