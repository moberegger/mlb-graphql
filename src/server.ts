import { ApolloServer } from "apollo-server";
import { ApolloServerPluginCacheControl } from "apollo-server-core";
import cache from "apollo-server-plugin-response-cache";

import emitter from "./core/emitter.js";
import schema from "./schema.js";
import context from "./context.js";

// XXX: Hack to get the default export working with ESM
// See: https://github.com/apollographql/apollo-server/issues/6022
const ApolloServerPluginResponseCache = (cache as any).default as typeof cache;

export default new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
  cache: "bounded",
  allowBatchedHttpRequests: false,
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 300 }),
    ApolloServerPluginResponseCache(),
    {
      serverWillStart: async () => ({
        async serverWillStop() {
          emitter.emit("shutdown");
        },
      }),
    },
  ],
});
