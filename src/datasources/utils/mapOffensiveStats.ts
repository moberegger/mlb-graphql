import type {
  APIStatistics,
  HittingStatistics,
} from "../SportRaderAPI.types.js";

export default (stats: APIStatistics): HittingStatistics => ({
  ...stats.hitting.overall.onbase,
  ...stats.hitting.overall.outs,
  ...stats.hitting.overall,
  obp: stats.hitting.overall.obp.toString(),
  babip: stats.hitting.overall.babip.toString(),
  k: stats.hitting.overall.outs.ktotal,
  sf: stats.hitting.overall.outs.sacfly,
  ...stats,
});
