import type { AppContext, ServiceFn } from "../context.js";
import type { SeasonType } from "../datasources/SportRadarAPI.js";
import memo from "../utils/memo.js";
import aggregateHittingStats from "./helpers/aggregateHittingStats.js";
import aggregateStats from "./helpers/aggregateStats.js";

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

  const findBySeasonIdAndPlayerId = ({
    seasonId,
    playerId,
  }: {
    seasonId: string;
    playerId: string;
  }) =>
    services.season
      .findByIdForPlayer({ seasonId, playerId })
      .then((season) => season?.statistics);

  const findForSeasonIdsByPlayerId = ({
    seasonIds,
    playerId,
  }: {
    seasonIds: string[];
    playerId: string;
  }) =>
    services.season
      .findManyByIdsForPlayer({ seasonIds, playerId })
      .then(aggregateStats);

  const findByTeamId = (
    teamId: string,
    { type = "REG", year }: { type: SeasonType; year: number }
  ) =>
    services.season
      .findByTeamId(teamId, { type, year })
      .then((season) => season?.statistics);

  return {
    findCareerOffensiveStatsByPlayerId,
    findBySeasonIdAndPlayerId,
    findForSeasonIdsByPlayerId,
    findByTeamId,
  };
};

export default service as ServiceFn<ReturnType<typeof service>>;
