import type {
  HittingStatistics,
  Season,
} from "../../datasources/SportRadarAPI.js";
import calculateAvg from "./calculateAvg.js";
import calculateBABIP from "./calculateBABIP.js";
import calculateOBP from "./calculateOBP.js";

export default (seasons: Season[]): HittingStatistics => {
  const stats = seasons.reduce<HittingStatistics>(
    (total, { statistics: { hitting } }) => ({
      ...total,
      ab: total.ab + hitting.ab,
      rbi: total.rbi + hitting.rbi,
      h: total.h + hitting.h,
      hr: total.hr + hitting.hr,
      k: total.k + hitting.k,
      bb: total.bb + hitting.bb,
      hbp: total.hbp + hitting.hbp,
      sf: total.sf + hitting.sf,
      bip: total.bip + hitting.bip,
    }),
    {
      ab: 0,
      rbi: 0,
      h: 0,
      hr: 0,
      k: 0,
      bb: 0,
      hbp: 0,
      sf: 0,
      bip: 0,
      avg: "",
      obp: "",
      babip: "",
    }
  );

  return {
    ...stats,
    avg: calculateAvg(stats),
    obp: calculateOBP(stats),
    babip: calculateBABIP(stats),
  };
};
