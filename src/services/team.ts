import type { AppContext, ServiceFn } from "../context.js";

const service = ({ ds, services }: AppContext) => {
  const findById = (id: string) => ds.sportsRadarApi.getTeam(id);

  const findByPlayerId = async (id: string) =>
    (await services.player.findById(id))?.team || null;

  return { findById, findByPlayerId };
};

export default service as ServiceFn<ReturnType<typeof service>>;
