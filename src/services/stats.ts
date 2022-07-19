import type { AppContext, ServiceFn } from "../context.js";
import type { SeasonType } from "../datasources/SportRadarAPI.js";
import memo from "../utils/memo.js";
import aggregateHittingStats from "./helpers/aggregateHittingStats.js";

const service = ({ services }: AppContext) => {
  const findCareerOffensiveStatsByPlayerId = memo(
    async (
      id: string,
      options: { filterBy?: { type?: SeasonType | "ALL" } } = {
        filterBy: { type: "REG" },
      }
    ) => {
      const seasons = await services.season.findAllByPlayerId(id, options);

      return aggregateHittingStats(seasons);
    }
  );

  return { findCareerOffensiveStatsByPlayerId };
};

export default service as ServiceFn<ReturnType<typeof service>>;
