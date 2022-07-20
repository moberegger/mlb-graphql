import type { SeasonType } from "../datasources/SportRadarAPI.js";
import memo from "../utils/memo.js";
import type { AppContext, ServiceFn } from "../context.js";

const service = ({ services }: AppContext) => {
  const findAllByPlayerId = memo(
    async (
      id: string,
      options: { filterBy?: { type?: SeasonType | "ALL" } } = {}
    ) => {
      const { filterBy: { type } = { type: "ALL" } } = options;
      const seasons = (await services.player.findById(id))?.seasons;

      if (!seasons) return [];
      if (seasons.length === 0 || type === "ALL") return seasons;

      return seasons.filter((season) => season.type === type);
    }
  );

  const findByIdForPlayer = async ({
    seasonId,
    playerId,
  }: {
    seasonId: string;
    playerId: string;
  }) => {
    const seasons = await findAllByPlayerId(playerId);

    return seasons?.find((season) => season.id === seasonId);
  };

  const findManyByIdsForPlayer = async ({
    seasonIds,
    playerId,
  }: {
    seasonIds: string[];
    playerId: string;
  }) => {
    const seasons = await findAllByPlayerId(playerId);

    return seasons?.filter((season) => seasonIds.includes(season.id));
  };

  return { findAllByPlayerId, findByIdForPlayer, findManyByIdsForPlayer };
};

export default service as ServiceFn<ReturnType<typeof service>>;
