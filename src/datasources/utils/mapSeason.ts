import type { APISeason, Season } from "../SportRaderAPI.types.js";

export default ({ totals, ...season }: APISeason): Season => ({
  offensiveStats: {
    h: totals.statistics.hitting.overall.onbase.h,
    ...totals.statistics.hitting.overall,
  },
  ...season,
});
