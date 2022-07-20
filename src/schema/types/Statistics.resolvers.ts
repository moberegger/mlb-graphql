import type { Context } from "../../context.js";
import type { Player, Season } from "../../datasources/SportRaderAPI.types.js";
import aggregateHittingStats from "../../services/helpers/aggregateHittingStats.js";
import type {
  ExtendedConnection,
  ExtendedEdge,
} from "../helpers/makeConnection.js";

export default {
  PlayerSeasonConnection: {
    async statistics(
      conn: ExtendedConnection<Player, Season>,
      _: object,
      ctx: Context
    ) {
      const seasonIds = conn.edges.map((edge) => edge.node.id);

      const seasons = await ctx.services.season.findManyByIdsForPlayer({
        seasonIds,
        playerId: conn.root.id,
      });

      // TODO: Move to stats service
      return { hitting: aggregateHittingStats(seasons) };
    },
  },

  PlayerSeasonEdge: {
    async statistics(
      edge: ExtendedEdge<Player, Season>,
      _: object,
      ctx: Context
    ) {
      const season = await ctx.services.season.findByIdForPlayer({
        seasonId: edge.node.id,
        playerId: edge.root.id,
      });

      // TODO: Make this a proper type and move to stats service layer
      return { hitting: season?.offensiveStats };
    },
  },
};
