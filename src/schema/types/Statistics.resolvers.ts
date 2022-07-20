import type { Context } from "../../context.js";
import type { Player, Season } from "../../datasources/SportRaderAPI.types.js";
import type {
  ExtendedConnection,
  ExtendedEdge,
} from "../helpers/makeConnection.js";

export default {
  PlayerSeasonConnection: {
    statistics: (
      conn: ExtendedConnection<Player, Season>,
      _: object,
      ctx: Context
    ) =>
      ctx.services.stats.findForSeasonIdsByPlayerId({
        seasonIds: conn.edges.map((edge) => edge.node.id),
        playerId: conn.root.id,
      }),
  },

  PlayerSeasonEdge: {
    statistics: (edge: ExtendedEdge<Player, Season>, _: object, ctx: Context) =>
      ctx.services.stats.findBySeasonIdAndPlayerId({
        seasonId: edge.node.id,
        playerId: edge.root.id,
      }),
  },
};
