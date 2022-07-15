import { ApolloServer } from "apollo-server";

import emitter from "./core/emitter.js";
import schema from "./schema.js";
import context from "./context.js";

export default new ApolloServer({
  schema,
  context,
  plugins: [
    {
      serverWillStart: async () => ({
        async serverWillStop() {
          emitter.emit("shutdown");
        },
      }),
    },
  ],
});
