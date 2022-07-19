import type { APISeason, Season } from "../SportRaderAPI.types.js";

export default ({ totals, ...season }: APISeason): Season => ({
  offensiveStats: {
    ...totals.statistics.hitting.overall.onbase,
    ...totals.statistics.hitting.overall.outs,
    ...totals.statistics.hitting.overall,
    obp: totals.statistics.hitting.overall.obp.toString(),
    babip: totals.statistics.hitting.overall.babip.toString(),
    k: totals.statistics.hitting.overall.outs.ktotal,
    sf: totals.statistics.hitting.overall.outs.sacfly,
  },
  ...season,
});
