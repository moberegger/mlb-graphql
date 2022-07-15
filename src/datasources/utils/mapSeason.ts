import type { APISeason, Season } from "../SportRaderAPI.types.js";

export default ({ totals, ...season }: APISeason): Season => ({
  offensiveStats: totals.statistics.hitting.overall,
  ...season,
});
