import type { ConnectionArguments } from "graphql-relay";
import type { Context } from "../../context.js";
import type {
  Player,
  Season,
  SeasonType,
} from "../../datasources/SportRadarAPI.js";
import makeConnection from "../helpers/makeConnection.js";

export default {
  Player: {
    seasons: makeConnection<
      Player,
      Context,
      ConnectionArguments & { filterBy: SeasonType | "ALL" },
      Season
    >()(
      (player: Player, args: { filterBy: SeasonType | "ALL" }, ctx: Context) =>
        ctx.services.season.findAllByPlayerId(player.id, {
          filterBy: { type: args.filterBy },
        })
    ),
  },
};
