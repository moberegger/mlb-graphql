import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";

import loadFiles from "./utils/loadFiles.js";

const [typeDefs, resolvers] = await Promise.all([
  loadFiles("./**/*.graphql"),
  loadFiles("./**/*.resolvers.ts"),
]);

export default makeExecutableSchema({
  typeDefs: [...typeDefs, ...scalarTypeDefs],
  resolvers: [...resolvers, scalarResolvers],
});
