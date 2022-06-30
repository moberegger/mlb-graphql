import server from "./server.js";

const { log } = console;

server.listen().then(({ url }) => {
  log(`🚀  Server ready at ${url}`);
});
