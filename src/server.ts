import { ApolloServer } from "apollo-server";

import MLBStatsAPI from "./datasources/MLBStatsAPI";
import SportRadarAPI from "./datasources/SportRadarAPI";
import schema from "./schema";

export default async () =>
  new ApolloServer({
    schema: await schema(),
    dataSources: () => ({
      mlbStatsApi: new MLBStatsAPI(),
      sportsRadarApi: new SportRadarAPI(),
    }),
  });
