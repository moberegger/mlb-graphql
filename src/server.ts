import { ApolloServer } from "apollo-server";
import { ApolloServerPluginCacheControl } from "apollo-server-core";

import emitter from "./core/emitter.js";
import schema from "./schema.js";
import context from "./context.js";

export default new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
  cache: "bounded",
  allowBatchedHttpRequests: false,
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 300 }),
    {
      serverWillStart: async () => ({
        async serverWillStop() {
          emitter.emit("shutdown");
        },
      }),
    },
  ],
});
