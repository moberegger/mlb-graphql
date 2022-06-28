module.exports = {
  Query: {
    player: (_: any, args: any, ctx: any) =>
      ctx.dataSources.mlbStatsApi.getPlayer(args.id),
  },
};
