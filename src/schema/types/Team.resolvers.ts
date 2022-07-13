import type { Context } from "../../context.js";
import type { Player } from "../../datasources/SportRadarAPI.js";
import makeEdge from "../helpers/makeEdge.js";

export default {
  Player: {
    currentTeam: makeEdge((player: Player, _: object, ctx: Context) =>
      ctx.services.team.findByPlayerId(player.id)
    ),
  },

  Query: {
    team: (_: undefined, { id }: { id: string }, ctx: Context) =>
      ctx.services.team.findById(id),
  },
};
