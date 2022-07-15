import type { Context } from "../../context.js";
import type { Player } from "../../datasources/SportRadarAPI.js";

export default {
  Player: {
    careerOffensiveStats: (player: Player, _: object, ctx: Context) =>
      ctx.services.stats.findCareerOffensiveStatsByPlayerId(player.id),
  },
};
