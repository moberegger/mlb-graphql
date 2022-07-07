import type { Context } from "../../context.js";

export default {
  Query: {
    player: (_: any, { id }: { id: string }, ctx: Context) =>
      ctx.services.player.findById(id),
  },
};
