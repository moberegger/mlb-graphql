import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import type { Context as ApolloContext } from "apollo-server-core";

import SportRadarAPI from "./datasources/SportRadarAPI.js";
import * as services from "./services/index.js";

const cache = new InMemoryLRUCache();

export interface DataSources {
  sportsRadarApi: SportRadarAPI;
}

export type Services = {
  [Property in keyof typeof services]: ReturnType<typeof services[Property]>;
};

export type ServiceObject = Services[keyof Services];

export interface AppContext {
  ds: DataSources;
  services: Services;
}

export interface ServiceFn<Service extends Record<string, Function>> {
  (ctx: AppContext): Service;
}

export type Context = ApolloContext<{
  services: Services;
}>;

export default (): Context => {
  // TODO: Do this in one step
  const sportsRadarApi = new SportRadarAPI();
  sportsRadarApi.initialize({ context: null, cache });

  const ds = { sportsRadarApi };

  return {
    services: Object.entries(services).reduce(
      (allServices, [name, fn]) => ({
        ...allServices,
        [name]: fn({ ds, services: allServices }),
      }),
      {} as Services
    ),
  };
};
