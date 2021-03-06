import type { AppContext, ServiceFn } from "../context.js";

const service = ({ ds }: AppContext) => {
  const findById = (id: string) => ds.sportsRadarApi.getPlayer(id);

  return { findById };
};

export default service as ServiceFn<ReturnType<typeof service>>;
