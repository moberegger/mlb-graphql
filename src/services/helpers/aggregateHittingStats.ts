import type {
  OffensiveStats,
  Season,
} from "../../datasources/SportRadarAPI.js";
import calculateAvg from "./calculateAvg.js";
import calculateBABIP from "./calculateBABIP.js";

export default (seasons: Season[]): OffensiveStats => {
  const stats = seasons.reduce<OffensiveStats>(
    (total, { offensiveStats }) => ({
      ...total,
      ab: total.ab + offensiveStats.ab,
      rbi: total.rbi + offensiveStats.rbi,
      h: total.h + offensiveStats.h,
      hr: total.hr + offensiveStats.hr,
      k: total.k + offensiveStats.k,
      sf: total.sf + offensiveStats.sf,
    }),
    { ab: 0, rbi: 0, h: 0, hr: 0, k: 0, sf: 0, avg: "", babip: "" }
  );

  return { ...stats, avg: calculateAvg(stats), babip: calculateBABIP(stats) };
};
