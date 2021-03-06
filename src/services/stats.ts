import type { AppContext, ServiceFn } from "../context.js";
import type { SeasonType } from "../datasources/SportRadarAPI.js";
import memo from "../utils/memo.js";
import aggregateHittingStats from "./helpers/aggregateHittingStats.js";
import aggregateStats from "./helpers/aggregateStats.js";

const service = ({ services }: AppContext) => {
  const findCareerOffensiveStatsByPlayerId = memo(
    (
      id: string,
      options: { filterBy?: { type?: SeasonType | "ALL" } } = {
        filterBy: { type: "REG" },
      }
    ) =>
      services.season.findAllByPlayerId(id, options).then(aggregateHittingStats)
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
    { seasonType = "REG", year }: { seasonType: SeasonType; year: number }
  ) =>
    services.season
      .findByTeamId(teamId, { type: seasonType, year })
      .then((season) => season?.statistics);

  return {
    findCareerOffensiveStatsByPlayerId,
    findBySeasonIdAndPlayerId,
    findForSeasonIdsByPlayerId,
    findByTeamId,
  };
};

export default service as ServiceFn<ReturnType<typeof service>>;
