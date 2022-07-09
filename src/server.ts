import { ApolloServer } from "apollo-server";
import type { GraphQLFormattedError } from "graphql";

import schema from "./schema.js";
import context from "./context.js";

export default new ApolloServer({
  schema,
  context,
  formatError(error) {
    console.error(error);
    return error as GraphQLFormattedError;
  },
});
