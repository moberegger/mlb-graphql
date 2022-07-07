import type { ApplicationContext } from "../../context.js";

export default {
  Query: {
    player: (_: any, { id }: { id: string }, ctx: ApplicationContext) =>
      ctx.services.player.findById(id),
  },
};
