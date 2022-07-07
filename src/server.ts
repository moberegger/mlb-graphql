import { ApolloServer } from "apollo-server";

import schema from "./schema.js";
import context from "./context.js";

export default new ApolloServer({ schema, context });
