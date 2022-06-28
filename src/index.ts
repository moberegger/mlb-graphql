import server from "./server";

const start = async () => (await server()).listen();

start().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
