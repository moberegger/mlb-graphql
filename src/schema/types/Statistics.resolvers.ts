import type { Context } from "../../context.js";
import type {
  Player,
  Season,
  Team,
} from "../../datasources/SportRaderAPI.types.js";
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

  TeamSeasonEdge: {
    statistics: (edge: ExtendedEdge<Team, Season>, _: object, ctx: Context) =>
      ctx.services.stats.findByTeamId(edge.root.id, {
        seasonType: edge.node.type,
        year: edge.node.year,
      }),
  },
};
