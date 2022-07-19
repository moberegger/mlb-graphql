import type { ConnectionArguments } from "graphql-relay";
import type { Context } from "../../context.js";
import type { Player, Season } from "../../datasources/SportRadarAPI.js";
import makeConnection from "../helpers/makeConnection.js";

export default {
  Player: {
    seasons: makeConnection<Player, Context, ConnectionArguments, Season>()(
      (player: Player, _: ConnectionArguments, ctx: Context) =>
        ctx.services.season.findAllByPlayerId(player.id)
    ),
  },
};
