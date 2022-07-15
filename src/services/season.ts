import type { SeasonType } from "../datasources/SportRadarAPI.js";
import memo from "../utils/memo.js";
import type { AppContext, ServiceFn } from "../context.js";

const service = ({ services }: AppContext) => {
  const findAllPlayerId = memo(
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

  return { findAllPlayerId };
};

export default service as ServiceFn<ReturnType<typeof service>>;
