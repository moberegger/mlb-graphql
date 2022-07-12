import type { AppContext, ServiceFn } from "../context.js";

const service = ({ ds }: AppContext) => {
  const findById = (id: string) => ds.sportsRadarApi.getTeam(id);

  const findByPlayerId = (id: string) => id;

  return { findById, findByPlayerId };
};

export default service as ServiceFn<ReturnType<typeof service>>;
