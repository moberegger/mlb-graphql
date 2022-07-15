import type {
  OffensiveStats,
  Season,
} from "../../datasources/SportRadarAPI.js";

// const battingAvg = (hits: number, ab: number) => hits / ab;

export default (seasons: Season[]): OffensiveStats =>
  seasons.reduce<OffensiveStats>(
    (total, { offensiveStats }) => ({
      ab: total.ab + offensiveStats.ab,
      rbi: total.rbi + offensiveStats.rbi,
    }),
    { ab: 0, rbi: 0 }
  );
