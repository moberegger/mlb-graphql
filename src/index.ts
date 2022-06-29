import server from "./server";

const { log } = console;

const start = async () => (await server()).listen();

start().then(({ url }) => {
  log(`🚀  Server ready at ${url}`);
});
