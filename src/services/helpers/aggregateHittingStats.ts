import { padEnd, round } from "lodash-es";

import type {
  OffensiveStats,
  Season,
} from "../../datasources/SportRadarAPI.js";

const battingAvg = (hits: number, ab: number) =>
  padEnd(round(hits / ab, 3).toString(), 5, "0");

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
    avg: battingAvg(stats.h, stats.ab).toString(),
  };
};
