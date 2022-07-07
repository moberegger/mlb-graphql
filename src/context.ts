import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import type { Context } from "apollo-server-core";

import SportRadarAPI from "./datasources/SportRadarAPI.js";
import * as services from "./services/index.js";

const cache = new InMemoryLRUCache();

export interface DataSources {
  sportsRadarApi: SportRadarAPI;
}

export type Services = {
  [Property in keyof typeof services]: ReturnType<typeof services[Property]>;
};

export interface ServiceContext {
  ds: DataSources;
  services: Services;
}

export interface ServiceFn {
  (ctx: ServiceContext): object;
}

export interface ApplicationContext {
  services: Services;
}

export default (): Context<ApplicationContext> => {
  // TODO: Do this in one step
  const sportsRadarApi = new SportRadarAPI();
  sportsRadarApi.initialize({ context: null, cache });

  const ds = { sportsRadarApi };

  return {
    services: Object.entries<ServiceFn>(services).reduce(
      (allServices, [name, fn]) => ({
        ...allServices,
        [name]: fn({ ds, services: allServices }),
      }),
      {} as Services
    ),
  };
};
