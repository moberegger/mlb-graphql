import type { Context } from "../../context.js";

export default {
  Player: {
    // currentTeam: (_: any, args: any, ctx: any) =>
    //   ctx.dataSources.sportsRadarApi.getPlayer(args.id),
  },

  Query: {
    team: (_: any, { id }: { id: string }, ctx: Context) =>
      ctx.services.team.findById(id),
  },
};
