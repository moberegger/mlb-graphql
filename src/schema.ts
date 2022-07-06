import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";

const [typeDefs, resolvers] = await Promise.all([
  loadFiles("./**/*.graphql"),
  loadFiles("./**/*.resolvers.ts"),
]);

export default makeExecutableSchema({
  typeDefs: [...typeDefs, ...scalarTypeDefs],
  resolvers: [...resolvers, scalarResolvers],
});
