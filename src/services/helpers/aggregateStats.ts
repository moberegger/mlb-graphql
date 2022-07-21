import type { Season, Statistics } from "../../datasources/SportRadarAPI.js";
import aggregateHittingStats from "./aggregateHittingStats.js";

export default (seasons: Season[]): Statistics => {
  const hitting = aggregateHittingStats(seasons);

  return { hitting };
};
