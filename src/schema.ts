import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const [typeDefs, resolvers] = await Promise.all([
  loadFiles("./**/*.graphql"),
  loadFiles("./**/resolvers.ts"),
]);

export default makeExecutableSchema({ typeDefs, resolvers });
