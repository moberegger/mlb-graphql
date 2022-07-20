import type { Season } from "../../datasources/SportRadarAPI.js";
import type { Statistics } from "../stats.types.js";
import aggregateHittingStats from "./aggregateHittingStats.js";

export default (seasons: Season[]): Statistics => {
  const hitting = aggregateHittingStats(seasons);

  return { hitting };
};
