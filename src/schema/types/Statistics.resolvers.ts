import type { Context } from "../../context.js";
import type { Player, Season } from "../../datasources/SportRaderAPI.types.js";

export default {
  PlayerSeasonEdge: {
    statistics: async (
      { root, node }: { root: Player; node: Season },
      _: object,
      ctx: Context
    ) => {
      const season = await ctx.services.season.findByIdForPlayer({
        seasonId: node.id,
        playerId: root.id,
      });

      // TODO: Make this a proper type
      return { hitting: season?.offensiveStats };
    },
  },
};
