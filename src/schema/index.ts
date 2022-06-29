import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

export default async () =>
  makeExecutableSchema({
    typeDefs: await loadFiles("src/**/*.graphql"),
    resolvers: await loadFiles("src/**/resolvers.(t|j)s"),
  });
