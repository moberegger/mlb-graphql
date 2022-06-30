import { ApolloServer } from "apollo-server";

import MLBStatsAPI from "./datasources/MLBStatsAPI.js";
import SportRadarAPI from "./datasources/SportRadarAPI.js";
import schema from "./schema.js";

export default new ApolloServer({
  schema,
  dataSources: () => ({
    mlbStatsApi: new MLBStatsAPI(),
    sportsRadarApi: new SportRadarAPI(),
  }),
});
