import type { ConnectionArguments } from "graphql-relay";
import type { Context } from "../../context.js";
import type {
  Player,
  Season,
  SeasonType,
  Team,
} from "../../datasources/SportRadarAPI.js";
import makeConnection from "../helpers/makeConnection.js";
import makeEdge from "../helpers/makeEdge.js";

export default {
  Player: {
    seasons: makeConnection<
      Player,
      Context,
      ConnectionArguments & { filterBy: SeasonType | "ALL" },
      Season
    >()(
      (
        player: Player,
        args: ConnectionArguments & { filterBy: SeasonType | "ALL" },
        ctx: Context
      ) =>
        ctx.services.season.findAllByPlayerId(player.id, {
          filterBy: { type: args.filterBy },
        })
    ),
  },

  Team: {
    season: makeEdge(
      (
        team: Team,
        { type = "REG", year }: { type: SeasonType; year: number },
        ctx: Context
      ) => ctx.services.season.findByTeamId(team.id, { type, year })
    ),
  },
};
