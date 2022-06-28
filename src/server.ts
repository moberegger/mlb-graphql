import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";

import MLBStatsAPI from "./datasources/MLBStatsAPI";

export default async () => {
  const schema = makeExecutableSchema({
    typeDefs: await loadFiles("src/*.graphql"),
    resolvers: await loadFiles("src/resolvers.ts"),
  });

  return new ApolloServer({
    schema,
    dataSources: () => ({
      mlbStatsApi: new MLBStatsAPI(),
    }),
  });
};
