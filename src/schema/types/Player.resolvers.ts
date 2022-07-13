import type { Context } from "../../context.js";

export default {
  Query: {
    player: (_: undefined, { id }: { id: string }, ctx: Context) =>
      ctx.services.player.findById(id),
  },
};
