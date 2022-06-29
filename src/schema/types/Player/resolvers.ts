module.exports = {
  Query: {
    player: (_: any, args: any, ctx: any) =>
      ctx.dataSources.sportsRadarApi.getPlayer(args.id),
  },
};
