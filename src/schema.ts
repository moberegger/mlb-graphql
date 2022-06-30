import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

export default makeExecutableSchema({
  typeDefs: await loadFiles("./**/*.graphql"),
  resolvers: await loadFiles("./**/resolvers.(t|j)s"),
});
